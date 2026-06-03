import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";

// ─── Password helpers ─────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Token generation ─────────────────────────────────────────────────────────

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── Session management ───────────────────────────────────────────────────────

export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  return token;
}

/**
 * Get session from cookie — for use in Server Components and Server Actions.
 * Uses next/headers cookies() which is only available in the App Router server context.
 */
export async function getSession() {
  let token: string | undefined;

  try {
    const cookieStore = cookies();
    token = cookieStore.get("session_token")?.value;
  } catch {
    return null;
  }

  if (!token) return null;

  return getSessionByToken(token);
}

/**
 * Get session by token string — for use in API routes where you have the token directly.
 */
export async function getSessionByToken(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { token } }).catch(() => {});
    }
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (
    !["SUPER_ADMIN", "CONTENT_ADMIN", "APPLICATION_ADMIN"].includes(user.role)
  ) {
    redirect("/dashboard");
  }
  return user;
}

export async function deleteSession(token: string) {
  await prisma.session.deleteMany({ where: { token } }).catch(() => {});
}
