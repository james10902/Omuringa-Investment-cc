export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendStatusUpdateEmail } from "@/lib/email";

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

  const application = await prisma.traineeApplication.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      documents: true,
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ application });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status, adminNotes } = await req.json();

  const existing = await prisma.traineeApplication.findUnique({
    where: { id: params.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const application = await prisma.traineeApplication.update({
    where: { id: params.id },
    data: {
      status,
      adminNotes: adminNotes || null,
      reviewedBy: admin.name,
      reviewedAt: new Date(),
    },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      documents: true,
    },
  });

  // Notify applicant if status changed
  if (status !== existing.status) {
    sendStatusUpdateEmail(
      existing.user.email,
      existing.user.name,
      status,
      adminNotes || undefined
    ).catch(console.error);

    await prisma.notification.create({
      data: {
        userId: existing.userId,
        title: "Application Status Updated",
        message: `Your application status has been updated to: ${status.replace(/_/g, " ")}`,
      },
    });
  }

  return NextResponse.json({ application });
}
