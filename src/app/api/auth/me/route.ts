import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { findUser, loadProgress } from "@/lib/server/blobStore";
import { SESSION_COOKIE, verifySession } from "@/lib/server/session";

export const runtime = "nodejs";

export async function GET() {
  const jar = await cookies();
  const session = verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ user: null }, { status: 401 });
  const user = await findUser(session.u);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });
  const progress = await loadProgress(user.username);
  return NextResponse.json({
    user: { username: user.username, role: user.role, myLevel: user.myLevel },
    progress,
  });
}
