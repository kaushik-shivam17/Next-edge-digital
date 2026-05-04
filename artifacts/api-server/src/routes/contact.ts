import { Router, type IRouter, type Request, type Response } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const CONTACT_EMAIL = "nextedgetech@rediffmail.com";

router.post("/contact", async (req: Request, res: Response) => {
  const { name, company, email, country, service, budget, message } = req.body as Record<string, string>;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields: name, email, message" });
    return;
  }

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

  const subject = `New Project Inquiry from ${name} — ${company || "Unknown"}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0c0e; color: #ffffff; padding: 32px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #CAA353; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #CAA353; font-size: 22px;">New Project Inquiry</h2>
        <p style="margin: 4px 0 0; color: #888; font-size: 13px;">Next Edge Digital — Contact Form</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 130px;">Full Name</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${company || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #CAA353;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Country</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${country || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${service || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
          <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${budget || "—"}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: #1a1a1e; border-left: 3px solid #CAA353; border-radius: 6px;">
        <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
        <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
      replyTo: email,
      subject,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: "Failed to send email", detail: error.message });
  }
});

export default router;
