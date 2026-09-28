import type { AbsolutePath } from "./types";
import type { GlobScanOptions } from "bun";

export const SCRIPT_NAME = "Tidy";

export const SNAPSHOT_ROOTS: AbsolutePath[] = ["/opt/homebrew/bin", "/usr/local/bin"];
export const EXCLUDED_DIRS = [
  "Desktop",
  "Documents",
  "Downloads",
  "Library",
  "Movies",
  "Music",
  "Pictures",
  "Public",
  ".Trash",
];
export const EXCLUDED_DIR_NAMES = new Set([
  "__pycache__",
  ".cache",
  ".git",
  ".mypy_cache",
  ".npm",
  ".pytest_cache",
  ".ruff_cache",
  "build",
  "dist",
  "node_modules",
  "out",
  "target",
  "vendor",
]);
export const SCAN_OPTIONS: GlobScanOptions = { onlyFiles: false, followSymlinks: false, dot: true };
