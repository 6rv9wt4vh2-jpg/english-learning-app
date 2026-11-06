import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isLevelSlug, type LevelSlug } from "@/lib/levels";
import { hashPassword } from "@/lib/server/passwords";
import {
  deleteUser,
  findUser,
  loadProgress,
  loadUsers,
  upsertUser,
} from "@/lib/server/blobStore";
import { SESSION_COOKIE, verifySession } from "@/lib/server/session";

export const runtime = "nodejs";

async function requireAdmin() {
  const jar = await cookies();
  const session = verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session || session.r !== "admin") return null;
  return session;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const users = await loadUsers();
  const rows = await Promise.all(
    users.map(async (u) => {
      const progress = await loadProgress(u.username);
      return {
        username: u.username,
        role: u.role,
        myLevel: u.myLevel,
        createdAt: u.createdAt,
        progressUpdatedAt: progress?.updatedAt ?? null,
        keyCount: progress ? Object.keys(progress.keys).length : 0,
      };
    }),
  );
  return NextResponse.json({ users: rows });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const username = String(body?.username || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const myLevel: LevelSlug = isLevelSlug(body?.myLevel) ? body.myLevel : "a1";
  if (!/^[a-z0-9._-]{2,32}$/.test(username)) {
    return NextResponse.json({ error: "Username: 2–32 chars, letters/digits . _ -" }, { status: 400 });
  }
  if (password.length < 4) {
    return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
  }
  if (username === "vlad") {
    return NextResponse.json({ error: "Cannot recreate admin here" }, { status: 400 });
  }
  const existing = await findUser(username);
  if (existing) return NextResponse.json({ error: "User already exists" }, { status: 409 });
  await upsertUser({
    username,
    passwordHash: hashPassword(password),
    role: "pupil",
    myLevel,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true, username, myLevel });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const username = String(searchParams.get("username") || "").trim().toLowerCase();
  if (!username || username === "vlad") {
    return NextResponse.json({ error: "Cannot delete this user" }, { status: 400 });
  }
  await deleteUser(username);
  return NextResponse.json({ ok: true });
}
