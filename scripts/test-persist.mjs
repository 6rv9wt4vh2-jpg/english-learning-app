/**
 * Node persistence smoke test (mock localStorage).
 * Run: node scripts/test-persist.mjs
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Minimal localStorage mock
const store = new Map();
globalThis.window = globalThis;
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => { store.set(k, String(v)); },
  removeItem: (k) => { store.delete(k); },
  clear: () => store.clear(),
  key: (i) => [...store.keys()][i] ?? null,
  get length() { return store.size; },
};
globalThis.DOMException = class DOMException extends Error {
  constructor(msg, name) { super(msg); this.name = name || "Error"; }
};

// Dynamic import won't work for TS — duplicate the persist logic inline for the test
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null || raw === "") return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}
function writeJSON(key, value, { force = false, isEmpty } = {}) {
  if (!force && isEmpty?.(value)) {
    const existing = localStorage.getItem(key);
    if (existing && existing !== "{}" && existing !== "[]") return false;
  }
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}

function createStore(key, fallback, isEmpty) {
  let memory = null;
  let hydrated = false;
  const hydrate = () => {
    if (hydrated && memory !== null) return memory;
    memory = readJSON(key, fallback());
    hydrated = true;
    return memory;
  };
  return {
    hydrate,
    get: () => hydrate(),
    set: (next, force = false) => {
      if (!hydrated) hydrate();
      memory = next;
      hydrated = true;
      writeJSON(key, next, { force, isEmpty });
    },
    update: (fn, force = false) => {
      const next = fn(hydrate());
      memory = next;
      hydrated = true;
      writeJSON(key, next, { force, isEmpty });
      return next;
    },
  };
}

const KEY = "english-app-progress-v1";
const empty = () => ({ words: {}, completedLessons: [], totalReviews: 0 });
const isEmpty = (p) => Object.keys(p.words).length === 0 && p.completedLessons.length === 0 && !p.totalReviews;

// Seed saved progress
localStorage.setItem(KEY, JSON.stringify({
  words: { "a1-0001": { wordId: "a1-0001", repetitions: 1, correctCount: 1 } },
  completedLessons: ["a1-g-to-be"],
  totalReviews: 3,
  streak: 2,
}));

const progressStore = createStore(KEY, empty, isEmpty);

// Simulate bad first render trying to save empty BEFORE hydrate
const refused = writeJSON(KEY, empty(), { isEmpty });
assert.equal(refused, false, "must refuse empty overwrite of existing progress");
assert.equal(JSON.parse(localStorage.getItem(KEY)).totalReviews, 3, "disk untouched");

// Hydrate then update
progressStore.hydrate();
progressStore.update((p) => ({
  ...p,
  words: { ...p.words, "a1-0002": { wordId: "a1-0002", repetitions: 1, correctCount: 1 } },
  totalReviews: p.totalReviews + 1,
}));

const after = JSON.parse(localStorage.getItem(KEY));
assert.equal(after.totalReviews, 4);
assert.ok(after.words["a1-0001"], "old word kept");
assert.ok(after.words["a1-0002"], "new word saved");
assert.deepEqual(after.completedLessons, ["a1-g-to-be"]);

// Simulate reload: new store instance
const store2 = createStore(KEY, empty, isEmpty);
const reloaded = store2.get();
assert.equal(reloaded.totalReviews, 4, "survives reload");
assert.ok(reloaded.words["a1-0001"]);

// Deck status merge
const deckKey = "deckstat:a1";
localStorage.setItem(deckKey, JSON.stringify({ "a1-0001": "easy" }));
function gradeCard(deck, id, grade) {
  const st = { ...JSON.parse(localStorage.getItem(`deckstat:${deck}`) || "{}"), [id]: grade };
  localStorage.setItem(`deckstat:${deck}`, JSON.stringify(st));
  return st;
}
gradeCard("a1", "a1-0002", "hard");
const deck = JSON.parse(localStorage.getItem(deckKey));
assert.equal(deck["a1-0001"], "easy");
assert.equal(deck["a1-0002"], "hard");

console.log("OK persistence tests passed");
