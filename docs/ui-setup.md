# ACLI-OS — UI/UX Setup

Agreed direction for the portfolio rework. Content (projects, experience, etc.) is filled in later; this doc defines the shell.

## Decisions

| Area | Decision |
|---|---|
| Desktop | Retro desktop OS: icons, draggable windows, top bar |
| Mobile | Retro handheld/PDA: app grid home, full-screen apps, bottom nav |
| Palette | Switchable phosphor themes: green (default), amber, cyan, mono; persisted |
| Intro | ~2.5s boot, skippable by any key/tap; returning visitors get 0.5s power-on; honors `prefers-reduced-motion` |
| Output | Rich blocks (tables, badges, clickable links/commands), revealed line-by-line |
| Entry (desktop) | Land on desktop with Terminal window open and focused |

## Flow

```
load → CRT power-on → boot (skippable) → device gate
                                         ├─ desktop (fine pointer, ≥ 900px) → ACLI-OS desktop + Terminal open
                                         └─ mobile/touch                    → Handheld home screen
```

## Shared core (both devices)

- **`src/data/`**: single source of truth: `profile`, `projects`, `experience`, `skills`, `education`.
- **`src/commands/`**: command registry. Each command is `{ name, aliases, flags, description, run(args, ctx) }` and returns **blocks**. `ctx` lets a command open an app (`open projects`) or change the theme. One registry drives `help`, autocomplete and both terminals.
- **`src/blocks/`**: rich output components: `Text`, `Heading`, `Table`, `Badge`, `Link`, `CommandLink` (click to run), `Card`, `List`.
- **`src/theme/`**: CSS variables on `[data-theme]` (`--bg`, `--fg`, `--dim`, `--accent`, `--error`, `--glow`); `ThemeProvider` + localStorage.
- **`src/crt/`**: global CRT overlay (scanlines, vignette, flicker), power-on, boot sequence, glitch. Effects can be toggled in Settings.
- **`src/apps/`**: one module per app, each exporting `{ id, title, icon, Desktop, Mobile }` views.

## Apps

| App | Icon label | Desktop window | Handheld screen |
|---|---|---|---|
| Terminal | `>_` Terminal | Full CLI, autocomplete, history | CLI with native input + command chips |
| About | `whoami.txt` | Profile card + bio | Profile screen |
| Projects | `Projects/` | Folder list → project detail pane | List → detail screen |
| Experience | `Work.log` | Timeline | Timeline |
| Skills | `Skills.cfg` | Grouped skill tables | Grouped chips |
| Resume | `Resume.pdf` | Viewer + download | Download button |
| Contact | `Mail` | Contact card + links | Contact card |
| Settings | `Settings` | Theme picker, CRT effects toggle, replay boot | Same |

## Desktop (ACLI-OS)

- **Top bar**: `▣ ACLI-OS` menu (About / Settings / Restart), active window title, theme switcher, clock.
- **Desktop icons**: grid on the left; double-click (or Enter when focused) opens the app.
- **Window manager** (reducer, no deps): open / close / minimize / maximize / focus / z-order, drag by title bar, cascade placement, one instance per app.
- **Taskbar** (bottom): open windows, click to focus or restore.
- **Keyboard**: `Ctrl+L` clear, `Ctrl+C` cancel, `Esc` dismiss suggestions, `Tab` complete, `↑/↓` history, `Alt+W` close window.

## Mobile (Handheld)

- **Device frame** with status bar (`ACLI-OS · ▮▮▮ · clock`).
- **Home**: name + title, 3-column app grid.
- **App screen**: full screen, slide transition, header with app title.
- **Bottom nav**: `HOME` · `◀ BACK` · `☰` (theme / settings sheet).
- Large tap targets (≥ 44px), no hover-dependent UI, no horizontal scroll.

## Accessibility & performance

- Respect `prefers-reduced-motion` (no flicker/glitch, instant output).
- Real focusable controls; windows/screens have proper labels.
- Code-split desktop vs. handheld shells so phones don't download the window manager.

## Resolved

1. Build tool: migrated CRA → Vite (+ Vitest).
2. Wallpaper: phosphor grid.
3. Sound: synthesized Web Audio effects (power-on, boot chime, key clicks, window open/close, errors) with a mute toggle in the top bar, Settings, and `sound on|off`.
