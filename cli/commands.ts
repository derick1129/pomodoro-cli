import { showStats } from "../core/stats";
import { startTimer } from "../core/timer";

export function registerCommands(program: any) {
    program
        .command("start")
        .option("--time <minutes>", "focus time")
        .option("--title <title>", "session title")
        .action((opts: any) => {
            const time = parseInt(opts.time) || 25;
            const title = opts.title || "Focus";
            startTimer(time, title)
    });
    
    program
        .command("stats")
        .action(() => {
            showStats();
    });
}