import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isLevelSlug, type LevelSlug } from "@/lib/levels";
import { findUser, loadProgress, saveProgress, upsertUser, type ProgressBlob } from "@/lib/server/blobStore";
import { SESSION_COOKIE, signSession, sessionCookieHeader, verifySession } from "@/lib/server/session";

export const runtime = "nodejs";

export async function GET() {
  const jar = await cookies();
  const session = verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const progress = await loadProgress(session.u);
  return NextResponse.json({ progress });
}

export async function PUT(req: Request) {
  const jar = await cookies();
  const session = verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const keys = (body?.keys && typeof body.keys === "object" ? body.keys : {}) as Record<string, string>;
    const myLevel: LevelSlug = isLevelSlug(body?.myLevel) ? body.myLevel : session.l;
    const blob: ProgressBlob = {
      version: 1,
      updatedAt: new Date().toISOString(),
      myLevel,
      keys,
      migratedLocal: !!body?.migratedLocal,
    };
    await saveProgress(session.u, blob);
    // keep myLevel on user record in sync
    const user = await findUser(session.u);
    if (user && user.myLevel !== myLevel) {
      await upsertUser({ ...user, myLevel });
    }
    const token = signSession({ u: session.u, r: session.r, l: myLevel });
    const res = NextResponse.json({ ok: true, updatedAt: blob.updatedAt });
    res.headers.set("Set-Cookie", sessionCookieHeader(token));
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
