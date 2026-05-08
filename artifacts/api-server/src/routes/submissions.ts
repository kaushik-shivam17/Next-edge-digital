import { Router, type IRouter, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import { timingSafeEqual } from "crypto";
import { db } from "@workspace/db";
import { contactSubmissions } from "@workspace/db";
import { desc } from "drizzle-orm";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const CONTACT_EMAIL = "nextedgetech@rediffmail.com";

const ADMIN_KEY = process.env["ADMIN_KEY"] ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 120,
  email: 254,
  country: 80,
  service: 80,
  budget: 80,
  message: 4000,
};

function escapeHtml(str: string): string {
  return str.replace(/[<>'"&]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;", "&": "&amp;" })[c] ?? c,
  );
}

function safeCompareKey(provided: string, expected: string): boolean {
  try {
    const maxLen = Math.max(provided.length, expected.length);
    const a = Buffer.from(provided.padEnd(maxLen, "\0").slice(0, maxLen));
    const b = Buffer.from(expected.padEnd(maxLen, "\0").slice(0, maxLen));
    return timingSafeEqual(a, b) && provided.length === expected.length;
  } catch {
    return false;
  }
}

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait before trying again." },
});

const adminReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests." },
});

async function sendNotificationEmail(data: {
  name: string; company: string; email: string;
  country: string; service: string; budget: string; message: string;
}): Promise<void> {
  const smtpPass = process.env["SMTP_PASSWORD"];
  if (!smtpPass) return;

  const safe = {
    name:    escapeHtml(data.name),
    company: escapeHtml(data.company),
    email:   escapeHtml(data.email),
    country: escapeHtml(data.country),
    service: escapeHtml(data.service),
    budget:  escapeHtml(data.budget),
    message: escapeHtml(data.message),
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.rediffmail.com",
    port: 465,
    secure: true,
    auth: { user: CONTACT_EMAIL, pass: smtpPass },
  });

  const subject = `New Inquiry: ${safe.name}${safe.company ? ` — ${safe.company}` : ""}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0c0e; color: #ffffff; padding: 32px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #CAA353; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #CAA353; font-size: 22px;">New Project Inquiry</h2>
        <p style="margin: 4px 0 0; color: #888; font-size: 13px;">NextEdge Tech — Admin Notification</p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 130px;">Full Name</td><td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: bold;">${safe.name}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td><td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.company || "—"}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 10px 0;"><a href="mailto:${safe.email}" style="color: #CAA353;">${safe.email}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Country</td><td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.country || "—"}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td><td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.service || "—"}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</td><td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.budget || "—"}</td></tr>
      </table>
      <div style="margin-top: 24px; padding: 20px; background: #1a1a1e; border-left: 3px solid #CAA353; border-radius: 6px;">
        <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
        <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${safe.email}?subject=Re: Your Project Inquiry — NextEdge Tech" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #CAA353, #F0C97A); color: #0c0c0e; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 8px;">Reply to ${safe.name}</a>
      </div>
      <p style="margin-top: 24px; color: #555; font-size: 12px; text-align: center;">Sent via NextEdge Tech admin notification</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"NextEdge Tech" <${CONTACT_EMAIL}>`,
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject,
    html,
  });
}

router.post("/submissions", submitLimiter, async (req: Request, res: Response) => {
  const { name, company, email, country, service, budget, message } = req.body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  const fields: Record<string, string> = { name, company, email, country, service, budget, message };
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const val = fields[field];
    if (val && val.length > max) {
      res.status(400).json({ error: "One or more fields exceed the maximum allowed length." });
      return;
    }
  }

  const data = {
    name: name.trim(),
    company: (company ?? "").trim(),
    email: email.trim(),
    country: (country ?? "").trim(),
    service: (service ?? "").trim(),
    budget: (budget ?? "").trim(),
    message: message.trim(),
  };

  try {
    const [row] = await db.insert(contactSubmissions).values(data).returning();
    sendNotificationEmail(data).catch(() => {});
    res.json({ success: true, id: row!.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission." });
  }
});

router.get("/submissions", adminReadLimiter, async (req: Request, res: Response) => {
  const key = (req.headers["x-admin-key"] as string | undefined) ?? "";

  if (!ADMIN_KEY) {
    res.status(503).json({ error: "Admin access not configured. Set the ADMIN_KEY secret." });
    return;
  }

  if (!safeCompareKey(key, ADMIN_KEY)) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  try {
    const rows = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    res.json(rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })));
  } catch {
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
});

router.delete("/submissions/:id", adminReadLimiter, async (req: Request, res: Response) => {
  const key = (req.headers["x-admin-key"] as string | undefined) ?? "";

  if (!ADMIN_KEY) {
    res.status(503).json({ error: "Admin access not configured. Set the ADMIN_KEY secret." });
    return;
  }

  if (!safeCompareKey(key, ADMIN_KEY)) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid submission ID." });
    return;
  }

  try {
    const deleted = await db
      .delete(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .returning();
    if (deleted.length === 0) {
      res.status(404).json({ error: "Submission not found." });
      return;
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete submission." });
  }
});

export default router;
