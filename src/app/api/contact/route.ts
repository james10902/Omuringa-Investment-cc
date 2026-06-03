export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["CONTACT", "QUOTE_REQUEST", "PARTNERSHIP", "TRAINING_ENQUIRY"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
  service: z.string().optional(),
  preferredContact: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    const { type, name, email, phone, company, subject, message, service, preferredContact } = parsed.data;

    // Save to database
    await prisma.formSubmission.create({
      data: {
        type,
        name,
        email,
        phone,
        company,
        subject: subject || type,
        message,
        service,
        metadata: preferredContact ? { preferredContact } : undefined,
      },
    });

    // Forward to Formspree for email delivery (non-blocking)
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formId) {
      fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          subject: subject || `${type.replace(/_/g, " ")} – Omuringa Investment CC`,
          message,
          service,
          "preferred-contact": preferredContact,
          _subject: `${type.replace(/_/g, " ")} – ${name}`,
        }),
      }).catch((err) => console.error("Formspree forward error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
