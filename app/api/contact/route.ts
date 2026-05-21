import { NextResponse } from "next/server";
import { Resend } from "resend";

// Verified Resend sender once the domain is set up; falls back to Resend's
// test sender until then. Notification delivery address defaults to info@bsundc.com.
const FROM = process.env.RESEND_FROM || "BS&C <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || "info@bsundc.com";

export async function POST(req: Request) {
  // The form is wired but cannot deliver until a Resend API key is in place.
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();
    const {
      enquiryType,
      firstName,
      lastName,
      company,
      email,
      phone,
      message,
      sourcePage,
      address,
    } = data ?? {};

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const type = String(enquiryType || "general");
    const name =
      [firstName, lastName].filter(Boolean).join(" ").trim() || "(not provided)";
    const timestamp = new Date().toISOString();

    const lines = [
      `Enquiry type: ${type}`,
      `Name: ${name}`,
      `Company: ${company || "(not provided)"}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
    ];
    if (address) lines.push(`Address: ${address}`);
    lines.push(
      `Source page: ${sourcePage || "(not provided)"}`,
      `Submitted: ${timestamp}`,
      "",
      "Message:",
      String(message)
    );

    // 1. Notification to BS&C
    const notify = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: String(email),
      subject: `[${type}] New enquiry via bsundc.com`,
      text: lines.join("\n"),
    });

    if (notify.error) {
      return NextResponse.json({ error: notify.error.message }, { status: 500 });
    }

    // 2. Acknowledgement to the submitter
    await resend.emails.send({
      from: FROM,
      to: String(email),
      subject: "Enquiry received — BS&C Tap-to-Shower™",
      text: "Thank you. We received your enquiry and normally respond within 1–2 business days. — BS&C",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send enquiry." },
      { status: 500 }
    );
  }
}
