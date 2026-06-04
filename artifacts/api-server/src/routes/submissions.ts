import { Router, type IRouter, type Request, type Response } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { db } from "@workspace/db";
import { contactSubmissions } from "@workspace/db";

const router: IRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.replace(/\u0000/g, "");
}

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 120,
  email: 254,
  country: 80,
  service: 80,
  budget: 80,
  message: 4000,
};

function realIp(req: Request): string {
  if (process.env["NODE_ENV"] === "production") {
    const xff = req.headers["x-forwarded-for"];
    if (xff) {
      const raw = Array.isArray(xff) ? xff[0] : xff;
      const last = raw.split(",").pop()?.trim();
      if (last) return last;
    }
  }
  return req.socket.remoteAddress ?? req.ip ?? "unknown";
}

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait before trying again." },
  keyGenerator: (req) => ipKeyGenerator(realIp(req)),
});

router.post("/submissions", submitLimiter, async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;
  const name    = sanitize(body.name);
  const company = sanitize(body.company);
  const email   = sanitize(body.email);
  const country = sanitize(body.country);
  const service = sanitize(body.service);
  const budget  = sanitize(body.budget);
  const message = sanitize(body.message);

  if (!name.trim() || !email.trim() || !message.trim()) {
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
    res.json({ success: true, id: row!.id });
  } catch {
    res.status(500).json({ error: "Failed to save submission." });
  }
});

export default router;
