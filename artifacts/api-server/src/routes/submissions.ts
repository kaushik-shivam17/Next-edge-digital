import { Router, type IRouter, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import { db, contactSubmissions } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait 15 minutes." },
});

router.post("/submissions", submitLimiter, async (req: Request, res: Response) => {
  const { name, company, email, country, service, budget, message } = req.body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name: name.trim(),
        company: (company ?? "").trim(),
        email: email.trim(),
        country: (country ?? "").trim(),
        service: (service ?? "").trim(),
        budget: (budget ?? "").trim(),
        message: message.trim(),
      })
      .returning();

    res.json({ success: true, id: submission.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission" });
  }
});

const ADMIN_KEY = process.env["ADMIN_KEY"] ?? "admin";

router.get("/submissions", async (req: Request, res: Response) => {
  const key = req.headers["x-admin-key"] as string | undefined;
  if (key !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const rows = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

export default router;
