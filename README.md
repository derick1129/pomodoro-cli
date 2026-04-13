# 🍅 Pomodoro CLI

A clean, terminal-first Pomodoro timer built with **Bun + TypeScript**.

It supports interactive sessions, direct CLI commands, live progress output, desktop notifications, and daily focus stats.

## Features

- Interactive menu for quick session start
- Preset session options (`25/5`, `50/10`) and custom minutes
- Direct command mode (`start`, `stats`)
- Live progress bar and remaining time display
- Keyboard controls while running (`p` pause, `r` resume, `q` quit)
- Desktop notifications when a session completes
- Daily stats persisted locally in your home directory

## Requirements

- [Bun](https://bun.com/) installed

## Installation

```bash
bun install
```

Optional: link it as a global command during local development:

```bash
bun link
```

Then you can run `pomodoro` directly.

## Usage

### Interactive mode

```bash
bun run index.ts
```

If linked:

```bash
pomodoro
```

### Start a timer directly

```bash
bun run index.ts start --time 25 --title "Deep Work"
```

Options:

- `--time <minutes>`: focus duration in minutes (default: `25`)
- `--title <title>`: session name shown in the UI (default: `Focus`)

### Show stats

```bash
bun run index.ts stats
```

## Timer Controls

During an active session:

- `p` → pause
- `r` → resume
- `q` → quit

## Stats Storage

Stats are written to:

```text
~/.pomodoro/stats.json
```

Tracked fields:

- `date` (current day)
- `sessions` (completed sessions today)
- `focusMinutes` (total focused minutes today)

## Project Structure

```text
.
├── cli/
│   ├── commands.ts   # Command registrations: start, stats
│   └── menu.ts       # Interactive prompt menu
├── core/
│   ├── timer.ts      # Timer loop, rendering, notifications, controls
│   └── stats.ts      # Stats file handling and display
├── index.ts          # CLI entrypoint
└── package.json
```

## Notes

- This project currently tracks the focus session duration only.
- Presets are labeled `25/5` and `50/10` in the menu for common Pomodoro splits.
