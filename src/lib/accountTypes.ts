import type { LevelSlug } from "@/lib/levels";

export type ProgressBlob = {
  version: 1;
  updatedAt: string;
  myLevel: LevelSlug;
  keys: Record<string, string>;
  migratedLocal?: boolean;
};
