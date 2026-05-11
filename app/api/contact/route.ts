import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@credvest.com";
    const body = await req.json();
    const { name, email, phone, company, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const inquiryPhrases: Record<string, string> = {
      developer: "a developer looking for a structured sales partner",
      professional: "a professional interested in joining the team",
      other: "reaching out to learn more about Credvest",
    };
    const inquiryPhrase = inquiryPhrases[inquiryType] ?? "reaching out";

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const bold = (s: string) =>
      `<strong style="color: #1a1a1a; font-weight: 600;">${esc(s)}</strong>`;

    const reachLine =
      email && phone
        ? `<p style="margin: 0 0 16px;">You can reach me at ${bold(email)} or ${bold(phone)}.</p>`
        : email
          ? `<p style="margin: 0 0 16px;">You can reach me at ${bold(email)}.</p>`
          : phone
            ? `<p style="margin: 0 0 16px;">You can reach me at ${bold(phone)}.</p>`
            : "";

    const fromLine = company
      ? `My name is ${bold(name)} from ${bold(company)}. I am ${esc(inquiryPhrase)}.`
      : `My name is ${bold(name)}. I am ${esc(inquiryPhrase)}.`;

    const { error } = await resend.emails.send({
      from: "Credvest Contact <contact@credvest.com>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #F8F8F8; color: #404040; font-size: 17px; line-height: 1.8; letter-spacing: -0.01em;">
          <p style="margin: 0 0 16px;">Dear Credvest,</p>
          <p style="margin: 0 0 16px;">${fromLine}</p>
          ${reachLine}
          <p style="margin: 0 0 16px; color: #2a2a2a; white-space: pre-wrap;">${esc(message)}</p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E0E0E0;">
            <p style="margin: 0; color: #888;">Regards,<br /><span style="color: #2a2a2a; font-weight: 600;">${esc(name)}</span></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
