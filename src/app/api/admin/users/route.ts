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

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;

  const where: any = { role: "TRAINEE" };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        application: { select: { status: true, submittedAt: true } },
        _count: { select: { documents: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, limit });
}
