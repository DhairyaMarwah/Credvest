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

    const inquiryLabels: Record<string, string> = {
      developer: "Developer / Builder",
      professional: "Job Seeker",
      other: "Other",
    };

    const { error } = await resend.emails.send({
      from: "Credvest Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 2px solid #FA412A; padding-bottom: 12px;">
            New Contact Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 120px;">Type</td>
              <td style="padding: 8px 0;">${inquiryLabels[inquiryType] ?? inquiryType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${
              phone
                ? `<tr>
              <td style="padding: 8px 0; color: #888;">Phone</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>`
                : ""
            }
            ${
              company
                ? `<tr>
              <td style="padding: 8px 0; color: #888;">Company</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f8f8f8; border-left: 3px solid #FA412A;">
            <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 8px 0 0; line-height: 1.6;">${message.replace(/\n/g, "<br />")}</p>
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
