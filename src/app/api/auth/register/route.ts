export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";
import { registerSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[REGISTER] Received body:", body);
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      console.log("[REGISTER] Zod errors:", parsed.error.errors);
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    // Check for existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword, role: "TRAINEE" },
    });

    // Create session token
    const token = await createSession(user.id);

    // Build response and set cookie
    const response = NextResponse.json(
      { success: true, role: user.role },
      { status: 201 }
    );

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(console.error);

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
