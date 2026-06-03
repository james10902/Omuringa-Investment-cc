export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";
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

    // Notify admin (non-blocking)
    const notifData: Record<string, string> = {
      "Form Type": type,
      Name: name,
      Email: email,
      ...(phone && { Phone: phone }),
      ...(company && { Company: company }),
      ...(service && { Service: service }),
      ...(preferredContact && { "Preferred Contact": preferredContact }),
      Message: message,
    };
    sendFormNotification(type.replace(/_/g, " "), notifData).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
