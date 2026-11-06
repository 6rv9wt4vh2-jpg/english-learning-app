import { NextResponse } from "next/server";
import { hashPassword, verifyPassword } from "@/lib/server/passwords";
import { ensureAdmin, findUser, loadProgress } from "@/lib/server/blobStore";
import { sessionCookieHeader, signSession } from "@/lib/server/session";
import { isLevelSlug } from "@/lib/levels";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await ensureAdmin(hashPassword);
    const body = await req.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    const user = await findUser(username);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
    const token = signSession({ u: user.username, r: user.role, l: isLevelSlug(user.myLevel) ? user.myLevel : "a1" });
    const progress = await loadProgress(user.username);
    const res = NextResponse.json({
      ok: true,
      user: { username: user.username, role: user.role, myLevel: user.myLevel },
      progress,
    });
    res.headers.set("Set-Cookie", sessionCookieHeader(token));
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
