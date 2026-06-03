export const dynamic = 'force-dynamic';

// Deprecated — investments are not part of the Omuringa security platform.
// This file is kept to prevent 404 errors on old routes.
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json([]);
}
