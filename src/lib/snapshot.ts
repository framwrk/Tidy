import type { AbsolutePath, Snapshot } from "../types";
import { Glob, type GlobScanOptions } from "bun";

const SNAPSHOT_ROOTS: AbsolutePath[] = ["/usr/bin", "/usr/local/bin"];
const SCAN_OPTIONS: GlobScanOptions = { onlyFiles: false, followSymlinks: false, dot: true };

export function snapshot(): Snapshot {
  const home = Bun.env.HOME;
  if (!home) throw new Error("HOME is not set");

  const entries: Snapshot = new Map();
  snapshotDir(home, entries);
  for (const root of SNAPSHOT_ROOTS) snapshotDir(root, entries);
  return entries;
}

function snapshotDir(dir: AbsolutePath, entries: Snapshot): void {
  let names: string[];
  let subdirs: Set<string>;
  try {
    names = [...new Glob("*").scanSync({ ...SCAN_OPTIONS, cwd: dir })];
    subdirs = new Set(new Glob("*/").scanSync({ ...SCAN_OPTIONS, cwd: dir }));
  } catch {
    return;
  }

  for (const name of names) {
    const path = `${dir}/${name}`;
    entries.set(path, Bun.file(path).lastModified);
    if (subdirs.has(name)) snapshotDir(path, entries);
  }
}
