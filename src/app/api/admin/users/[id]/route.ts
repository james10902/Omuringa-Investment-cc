export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getAdminUser(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return null;
  const session = await getSessionByToken(token);
  if (!session) return null;
  const { user } = session;
  if (!["SUPER_ADMIN", "CONTENT_ADMIN", "APPLICATION_ADMIN"].includes(user.role)) {
    return null;
  }
  return user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      application: {
        include: { documents: true },
      },
      documents: { orderBy: { createdAt: "desc" } },
      notifications: { orderBy: { createdAt: "desc" }, take: 10 },
      _count: { select: { documents: true, notifications: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Never expose password
  const { password: _, ...safeUser } = user as any;
  return NextResponse.json({ user: safeUser });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Only SUPER_ADMIN can change roles or deactivate
  const body = await req.json();
  const { isActive, role } = body;

  // Prevent non-super-admins from changing roles
  if (role !== undefined && admin.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only Super Admins can change roles" }, { status: 403 });
  }

  // Prevent admins from deactivating themselves
  if (params.id === admin.id) {
    return NextResponse.json({ error: "You cannot modify your own account" }, { status: 400 });
  }

  const updateData: any = {};
  if (isActive !== undefined) updateData.isActive = isActive;
  if (role !== undefined) updateData.role = role;

  const user = await prisma.user.update({
    where: { id: params.id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}
