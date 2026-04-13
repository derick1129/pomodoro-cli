import inquirer from "inquirer";
import chalk from "chalk";
import { showStats } from "../core/stats";
import { startTimer } from "../core/timer";

export async function startInteractive() {
    console.clear();

    const { choice } = await inquirer.prompt([
  {
    type: "list",
    name: "choice",
    message: chalk.blue("🍅 Choose a pomodoro split:"),
    choices: ["25/5", "50/10", "Custom", "Stats", "Exit"]
  }
]);

    if (choice === "Exit") process.exit();
    if (choice === "Stats") {
        showStats();
        return setTimeout(startInteractive, 2000);
    }

    let time = choice === "25/5" ? 25 : 50;

    if (choice === "Custom") {
        const res = await inquirer.prompt([
            {type: "number", name: "time", message: "Minutes:" }
        ]);
        time = res.time;
    }

    const { title } = await inquirer.prompt([
        { type: "input", name: "title", message: "Session title:" }
    ]);
    startTimer(time, title, startInteractive);
}