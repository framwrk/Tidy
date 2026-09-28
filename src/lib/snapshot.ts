import { Glob } from "bun";

const SNAPSHOT_ROOTS = [Bun.env.HOME ?? "", "/usr/bin", "/usr/local/bin"];
const SCAN_OPTIONS = { onlyFiles: false, followSymlinks: false, dot: true };

export function snapshot() {
  const entries = new Map<string, number>();
  for (const root of SNAPSHOT_ROOTS) snapshotDir(root, entries);
  return entries;
}

function snapshotDir(dir: string, entries: Map<string, number>) {
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
