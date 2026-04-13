import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

const BASE_DIR = path.join(os.homedir(), ".pomodoro");
const FILE = path.join(BASE_DIR, "stats.json");

function ensureFile() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(
      FILE,
      JSON.stringify({ date: "", sessions: 0, focusMinutes: 0 }, null, 2)
    );
  }
}

export function updateStats(minutes: number) {
  ensureFile();

  const today = new Date().toISOString().split("T")[0];

  let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));

  if (data.date !== today) {
    data = { date: today, sessions: 0, focusMinutes: 0 };
  }

  data.sessions++;
  data.focusMinutes += minutes;

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function showStats() {
  ensureFile();

  const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));

  console.log(chalk.magenta.bold("📊 Stats\n"));
  console.log(`Sessions: ${data.sessions}`);
  console.log(`Focus Time: ${data.focusMinutes} min`);
}