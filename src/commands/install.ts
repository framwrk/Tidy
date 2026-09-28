import type { Snapshot } from "../types";
import { log } from "../lib/utilities";
import { snapshot } from "../lib/snapshot";

export function install(): void {
  log("install command called");

  const before: Snapshot = snapshot();
  log(`snapshotted ${before.size} files and folders`);
}
