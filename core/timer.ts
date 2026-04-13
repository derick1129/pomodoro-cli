import chalk from "chalk";
import { updateStats } from "./stats";
import notifier from "node-notifier";

export function startTimer(minutes: number, title: string, onComplete?: any) {
  let total = minutes * 60;
  let paused = false;

  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on("data", (key) => {
    const k = key.toString();

    if (k === "p") paused = true;
    if (k === "r") paused = false;
    if (k === "q") process.exit();
  });

  function renderUI() {
    const percent = Math.floor(((minutes * 60 - total) / (minutes * 60)) * 100);

    const barLength = 20;
    const filled = Math.floor((percent / 100) * barLength);

    const bar =
      "█".repeat(filled) + "░".repeat(barLength - filled);

    const min = Math.floor(total / 60);
    const sec = total % 60;

    const time = `${min}:${sec.toString().padStart(2, "0")}`;

    console.clear();

    console.log(chalk.green.bold(`🍅 ${title}\n`));
    console.log(`[${bar}] ${percent}%\n`);
    console.log(chalk.cyan(`Time: ${time}`));
    console.log(chalk.gray("\n[p pause | r resume | q quit]"));
  }

  const interval = setInterval(() => {
    if (!paused) {
      total--;
    }

    renderUI();

    if (total <= 0) {
      clearInterval(interval);

      console.clear();
      console.log(chalk.green.bold("✅ Session Complete!\n"));

      notifier.notify({
        title: "Pomodoro Done",
        message: title
      });

      updateStats(minutes);

      process.stdin.setRawMode(false);

      if (onComplete) setTimeout(onComplete, 2000);
    }
  }, 1000);
}