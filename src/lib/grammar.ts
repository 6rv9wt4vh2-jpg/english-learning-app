export interface LTMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  rule: { id: string; description: string; issueType?: string; category: { id: string; name: string } };
}

export type CheckResult = { ok: true; matches: LTMatch[] } | { ok: false; error: string };

async function direct(text: string): Promise<CheckResult> {
  const r = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ text, language: "en-US", motherTongue: "ru" }),
  });
  if (r.status === 429) return { ok: false, error: "Too many checks — wait a minute and try again. / Слишком много проверок, подождите минуту." };
  if (!r.ok) return { ok: false, error: `Checker error ${r.status}` };
  return { ok: true, matches: (await r.json()).matches ?? [] };
}

/** Free LanguageTool public API (≤20 requests/min per IP, ≤20 KB per request). Uses our /api/check proxy, falls back to calling LanguageTool directly. */
export async function checkText(text: string): Promise<CheckResult> {
  try {
    const r = await fetch("/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    if (r.ok) return { ok: true, matches: (await r.json()).matches ?? [] };
    if (r.status === 413) return { ok: false, error: "Text is too long. / Текст слишком длинный." };
  } catch { /* fall through */ }
  try {
    return await direct(text);
  } catch {
    return { ok: false, error: "Grammar checker is unavailable (offline?). Try again later. / Проверка недоступна, попробуйте позже." };
  }
}

/** Apply the first suggestion of every match to produce a corrected version. */
export function applyCorrections(text: string, matches: LTMatch[]): string {
  let out = text;
  [...matches].sort((a, b) => b.offset - a.offset).forEach((m) => {
    const rep = m.replacements[0]?.value;
    if (rep !== undefined) out = out.slice(0, m.offset) + rep + out.slice(m.offset + m.length);
  });
  return out;
}
