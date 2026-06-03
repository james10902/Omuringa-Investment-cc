import { NextResponse } from "next/server";

// NextAuth is not used — auth is handled via custom sessions.
// This catch-all prevents 404s on /api/auth/* paths not explicitly handled.
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
export async function POST() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
