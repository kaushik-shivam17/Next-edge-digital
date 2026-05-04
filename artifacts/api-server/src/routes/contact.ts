import { Router, type IRouter, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const CONTACT_EMAIL = "nextedgetech@rediffmail.com";

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 120,
  email: 254,
  country: 80,
  service: 80,
  budget: 80,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHtml(str: string): string {
  return str.replace(/[<>'"&]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;", "&": "&amp;" })[c] ?? c,
  );
}

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait 15 minutes before trying again." },
});

router.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  const { name, company, email, country, service, budget, message } = req.body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Missing required fields: name, email, message" });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const fields: Record<string, string> = { name, company, email, country, service, budget, message };
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const val = fields[field];
    if (val && val.length > max) {
      res.status(400).json({ error: `Field "${field}" exceeds maximum length of ${max} characters` });
      return;
    }
  }

  const safe = {
    name:    stripHtml(name.trim()),
    company: stripHtml((company ?? "").trim()),
    email:   stripHtml(email.trim()),
    country: stripHtml((country ?? "").trim()),
    service: stripHtml((service ?? "").trim()),
    budget:  stripHtml((budget ?? "").trim()),
    message: stripHtml(message.trim()),
  };

  const smtpPass = process.env["SMTP_PASSWORD"];
  if (!smtpPass) {
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.rediffmail.com",
    port: 465,
    secure: true,
    auth: {
      user: CONTACT_EMAIL,
      pass: smtpPass,
    },
  });

  const subject = `New Project Inquiry from ${safe.name} — ${safe.company || "Unknown"}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0c0e; color: #ffffff; padding: 32px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #CAA353; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #CAA353; font-size: 22px;">New Project Inquiry</h2>
        <p style="margin: 4px 0 0; color: #888; font-size: 13px;">Next Edge Digital — Contact Form</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 130px;">Full Name</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: bold;">${safe.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.company || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${safe.email}" style="color: #CAA353;">${safe.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Country</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.country || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.service || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safe.budget || "—"}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: #1a1a1e; border-left: 3px solid #CAA353; border-radius: 6px;">
        <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
        <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
      </div>

      <p style="margin-top: 24px; color: #555; font-size: 12px; text-align: center;">
        Sent via Next Edge Digital contact form
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Next Edge Digital" <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: safe.email,
      subject,
      html,
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
