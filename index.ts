#!/usr/bin/env bun 
import { program } from "commander";
import { registerCommands } from "./cli/commands";
import { startInteractive } from "./cli/menu";


program
  .name("pomodoro")
  .description("🍅 Pomodoro CLI");
registerCommands(program);

if (process.argv.length <= 2) {
  await startInteractive();
} else {
  program.parse(process.argv);
}
