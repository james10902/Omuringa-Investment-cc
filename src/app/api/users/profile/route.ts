export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUser(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return null;
  const session = await getSessionByToken(token);
  return session?.user ?? null;
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
}

export async function PUT(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  // Check email uniqueness if changed
  if (email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name, email, phone: phone || null },
  });

  return NextResponse.json({
    user: { name: updated.name, email: updated.email, phone: updated.phone },
  });
}
