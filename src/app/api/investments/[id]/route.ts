import { NextResponse } from "next/server";
// Deprecated route — investments are not part of the Omuringa security platform.
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
export async function PATCH() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
export async function DELETE() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
