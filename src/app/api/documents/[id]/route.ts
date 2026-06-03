export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromBlob } from "@/lib/blob";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = await getSessionByToken(token);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user;

  const document = await prisma.document.findFirst({
    where: { id: params.id, userId: user.id },
  });

  if (!document) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  // Delete file from blob storage
  if (document.filePath) {
    try {
      await deleteFromBlob(document.filePath);
    } catch {
      // Blob may not exist — continue
    }
  }

  await prisma.document.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
