# ACLI-OS — Akash's portfolio

An interactive portfolio that boots into a retro CRT operating system.

- **Desktop:** ACLI-OS desktop with icons, draggable/resizable windows, taskbar and a full command-line shell.
- **Mobile:** a retro handheld with an app grid, full-screen apps and a touch-friendly terminal.
- Switchable phosphor themes (green, amber, cyan, mono), synthesized sound effects with mute, and CRT effects that respect `prefers-reduced-motion`.

Live: https://akash-2176.github.io/portfolio/

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm test         # vitest
npm run build    # production build → dist/
npm run deploy   # publish dist/ to GitHub Pages
```

## Layout

```
src/
  data/        content (profile, projects, experience, skills)
  content/     content → output blocks, shared by terminal and apps
  commands/    terminal command registry + autocomplete
  blocks/      rich output renderer (tables, badges, links, clickable commands)
  terminal/    shell UI
  apps/        app metadata + app components (one per window/screen)
  desktop/     window manager, top bar, icons, taskbar
  handheld/    mobile shell
  boot/        boot sequence
  system/      settings (theme/sound/crt), sound synth, storage, hooks
```

Adding a terminal command: add an entry to `COMMANDS` in `src/commands/registry.js`.
Adding an app: add metadata to `src/apps/meta.js` and a component to `APP_COMPONENTS` in `src/apps/apps.jsx`.
