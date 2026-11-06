import { get, put } from "@vercel/blob";
import type { LevelSlug } from "@/lib/levels";
import type { ProgressBlob } from "@/lib/accountTypes";
export type { ProgressBlob };

export type UserRecord = {
  username: string;
  passwordHash: string;
  role: "admin" | "pupil";
  myLevel: LevelSlug;
  createdAt: string;
};

const USERS_PATH = "accounts/users.json";
const progressPath = (username: string) => `accounts/progress/${encodeURIComponent(username.toLowerCase())}.json`;

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  return new TextDecoder().decode(out);
}

async function readJson<T>(pathname: string): Promise<T | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const res = await get(pathname, { access: "private", token, useCache: false });
    if (!res || res.statusCode !== 200 || !res.stream) return null;
    const text = await streamToText(res.stream);
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function writeJson(pathname: string, data: unknown) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN missing");
  await put(pathname, JSON.stringify(data), {
    access: "private",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function loadUsers(): Promise<UserRecord[]> {
  const data = await readJson<{ users: UserRecord[] }>(USERS_PATH);
  return data?.users ?? [];
}

export async function saveUsers(users: UserRecord[]) {
  await writeJson(USERS_PATH, { users, updatedAt: new Date().toISOString() });
}

export async function findUser(username: string): Promise<UserRecord | null> {
  const users = await loadUsers();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function upsertUser(user: UserRecord) {
  const users = await loadUsers();
  const i = users.findIndex((u) => u.username.toLowerCase() === user.username.toLowerCase());
  if (i >= 0) users[i] = user;
  else users.push(user);
  await saveUsers(users);
}

export async function deleteUser(username: string) {
  const users = (await loadUsers()).filter((u) => u.username.toLowerCase() !== username.toLowerCase());
  await saveUsers(users);
  // leave progress blob (orphan ok) or overwrite empty
  await writeJson(progressPath(username), {
    version: 1,
    updatedAt: new Date().toISOString(),
    myLevel: "a1",
    keys: {},
    deleted: true,
  });
}

export async function loadProgress(username: string): Promise<ProgressBlob | null> {
  const p = await readJson<ProgressBlob & { deleted?: boolean }>(progressPath(username));
  if (!p || p.deleted) return null;
  return p;
}

export async function saveProgress(username: string, progress: ProgressBlob) {
  await writeJson(progressPath(username), progress);
}

export async function ensureAdmin(hashPassword: (p: string) => string) {
  const pass = process.env.APP_PASSWORD;
  if (!pass) return;
  const users = await loadUsers();
  if (users.some((u) => u.username.toLowerCase() === "vlad")) return;
  users.push({
    username: "vlad",
    passwordHash: hashPassword(pass),
    role: "admin",
    myLevel: "b1",
    createdAt: new Date().toISOString(),
  });
  await saveUsers(users);
}
