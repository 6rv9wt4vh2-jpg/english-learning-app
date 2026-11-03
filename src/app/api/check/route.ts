import { NextResponse } from "next/server";

export const runtime = "edge";
const LT = "https://api.languagetool.org/v2/check";

export async function POST(req: Request) {
  let text = "";
  try {
    const body = await req.json();
    text = String(body?.text ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!text.trim()) return NextResponse.json({ matches: [] });
  if (text.length > 15000) return NextResponse.json({ error: "Text too long (max 15 000 characters)" }, { status: 413 });
  try {
    const r = await fetch(LT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({ text, language: "en-US", motherTongue: "ru" }),
    });
    if (r.status === 429) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    if (!r.ok) return NextResponse.json({ error: `LanguageTool error ${r.status}` }, { status: 502 });
    const data = await r.json();
    return NextResponse.json({ matches: data.matches ?? [] });
  } catch {
    return NextResponse.json({ error: "LanguageTool unavailable" }, { status: 502 });
  }
}
