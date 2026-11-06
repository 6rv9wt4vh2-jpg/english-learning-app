import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;

/** scrypt hash as `scrypt$salt$hex` */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEYLEN, { N, r: R, p: P }).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [algo, salt, hash] = stored.split("$");
    if (algo !== "scrypt" || !salt || !hash) return false;
    const got = scryptSync(password, salt, KEYLEN, { N, r: R, p: P });
    const want = Buffer.from(hash, "hex");
    if (got.length !== want.length) return false;
    return timingSafeEqual(got, want);
  } catch {
    return false;
  }
}
