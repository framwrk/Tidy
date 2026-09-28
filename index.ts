import { install } from "./src/commands/install";
import { list } from "./src/commands/list";
import { uninstall } from "./src/commands/uninstall";

const SCRIPT_NAME = "Tidy";

const command = process.argv[2];

switch (command) {
  case "add":
  case "install":
    install();
    break;

  case "unadd":
  case "remove":
  case "uninstall":
    uninstall();
    break;

  case "show":
  case "list":
    list();
    break;

  default:
    help();
}

function help(): void {
  console.log("Name");
  console.log(`\t${SCRIPT_NAME} - Wraps installers and remembers what they added, so you can cleanly remove them later.`);

  console.log("Usage");
  console.log(`\t${SCRIPT_NAME.toLowerCase()} <COMMAND>`);

  console.log("Commands");
  console.log("\tinstall      Run an installer and record everything it adds");
  console.log("\tuninstall    Remove a tool by reversing what its install added");
  console.log("\tlist         Show past installs Tidy is tracking");
}
