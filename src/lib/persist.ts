/**
 * Safe localStorage helpers with hydrate-before-save.
 * Prevents writing empty/default state before load (or from a stale hook instance).
 */

export type PersistStatus = "ok" | "unavailable" | "quota";

let status: PersistStatus = "ok";

export function persistStatus(): PersistStatus {
  return status;
}

export function canPersist(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const k = "__persist_probe__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    status = "ok";
    return true;
  } catch {
    status = "unavailable";
    return false;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null || raw === "") return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(
  key: string,
  value: T,
  opts?: { force?: boolean; isEmpty?: (v: T) => boolean },
): boolean {
  if (typeof window === "undefined") return false;
  if (!canPersist()) return false;
  try {
    if (!opts?.force && opts?.isEmpty?.(value)) {
      const existing = localStorage.getItem(key);
      if (existing && existing !== "" && existing !== "null" && existing !== "{}" && existing !== "[]") {
        return false;
      }
    }
    localStorage.setItem(key, JSON.stringify(value));
    status = "ok";
    return true;
  } catch (e) {
    status = e instanceof DOMException && (e as DOMException).name === "QuotaExceededError" ? "quota" : "unavailable";
    return false;
  }
}

export function removeKey(key: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function createStore<T>(
  key: string,
  fallback: () => T,
  isEmpty: (v: T) => boolean,
  transform?: (v: T) => T,
) {
  let memory: T | null = null;
  let hydrated = false;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((l) => l());
  const xf = (v: T) => (transform ? transform(v) : v);

  const hydrate = (): T => {
    if (hydrated && memory !== null) return memory;
    if (typeof window === "undefined") {
      memory = xf(fallback());
      return memory;
    }
    const raw = localStorage.getItem(key);
    if (raw == null || raw === "") {
      memory = xf(fallback());
    } else {
      try {
        memory = xf(JSON.parse(raw) as T);
      } catch {
        memory = xf(fallback());
      }
    }
    hydrated = true;
    return memory;
  };

  const get = (): T => hydrate();

  const set = (next: T, force = false) => {
    if (typeof window !== "undefined" && !hydrated) hydrate();
    memory = xf(next);
    hydrated = true;
    writeJSON(key, memory, { force, isEmpty });
    notify();
  };

  const update = (fn: (prev: T) => T, force = false) => {
    const next = fn(hydrate());
    set(next, force);
    return memory!;
  };

  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };

  const serverSnapshot = () => xf(fallback());

  return { key, get, set, update, subscribe, serverSnapshot, hydrate, isHydrated: () => hydrated };
}
