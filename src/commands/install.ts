import { log } from "../lib/utilities";
import { snapshot } from "../lib/snapshot";

export function install() {
  log("install command called");

  const before = snapshot();
  log(`snapshotted ${before.size} files and folders`);
}
