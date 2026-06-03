export const dynamic = 'force-dynamic';

// Not used — investments feature removed
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
