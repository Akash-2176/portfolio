import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { APPS, findApp } from '../apps/meta';
import { THEMES } from '../system/settings';
import {
  contactBlocks,
  educationBlocks,
  experienceBlocks,
  findProject,
  projectBlocks,
  projectsBlocks,
  skillsBlocks,
  whoamiBlocks,
} from '../content/views';

const text = (t, tone) => ({ type: 'text', text: t, tone });
const err = (t) => [text(t, 'error')];

// ctx: { openApp, closeSelf?, clear, reboot, theme, setTheme, muted, setMuted, crt, setCrt, history, device }
// Every command returns an array of blocks (or nothing).
export const COMMANDS = [
  { name: 'help', desc: 'List available commands', run: () => helpBlocks() },
  { name: 'whoami', aliases: ['about'], desc: 'Who is Akash?', run: () => whoamiBlocks() },
  {
    name: 'projects',
    aliases: ['project'],
    args: '[n]',
    complete: () => projects.map((_, i) => String(i + 1)),
    desc: 'List projects, or show one',
    run: ([key]) => {
      if (!key) return projectsBlocks();
      const p = findProject(key);
      return p ? projectBlocks(p) : err(`projects: no project '${key}' (1–${projects.length})`);
    },
  },
  { name: 'experience', aliases: ['work'], desc: 'Work history', run: () => experienceBlocks() },
  { name: 'education', desc: 'Education', run: () => educationBlocks() },
  {
    name: 'skills',
    args: '[--group]',
    complete: () => skills.map((g) => `--${g.flag}`),
    desc: 'Skills, optionally filtered',
    run: ([flag]) => {
      if (!flag) return skillsBlocks();
      const name = flag.replace(/^-+/, '');
      return skills.some((g) => g.flag === name)
        ? skillsBlocks(name)
        : err(`skills: unknown group '${flag}'. Try: ${skills.map((g) => `--${g.flag}`).join(' ')}`);
    },
  },
  { name: 'contact', aliases: ['email'], desc: 'How to reach me', run: () => contactBlocks() },
  {
    name: 'resume',
    desc: 'Open the resume',
    run: (_, ctx) => {
      ctx.openApp('resume');
      return [text('Opening Resume.pdf…', 'dim')];
    },
  },
  { name: 'github', desc: 'GitHub profile', run: () => [text({ href: profile.links.github })] },
  { name: 'linkedin', desc: 'LinkedIn profile', run: () => [text({ href: profile.links.linkedin })] },
  {
    name: 'ls',
    desc: 'List apps on this system',
    run: () => [
      {
        type: 'table',
        rows: APPS.map((a) => [{ dim: a.glyph }, { cmd: `open ${a.id}`, label: a.file }]),
      },
    ],
  },
  {
    name: 'open',
    args: '<app|github|linkedin>',
    complete: () => [...APPS.map((a) => a.id), 'github', 'linkedin'],
    desc: 'Open an app or link',
    run: ([target], ctx) => {
      if (!target) return err('usage: open <app|github|linkedin>   (see `ls`)');
      if (profile.links[target]) {
        window.open(profile.links[target], '_blank', 'noopener');
        return [text(`Opening ${target}…`, 'dim')];
      }
      const app = findApp(target);
      if (!app) return err(`open: '${target}' not found (see \`ls\`)`);
      ctx.openApp(app.id);
      return [text(`Opening ${app.title}…`, 'dim')];
    },
  },
  {
    name: 'theme',
    args: '[name]',
    complete: () => THEMES.map((t) => t.id),
    desc: 'Switch phosphor color',
    run: ([name], ctx) => {
      if (!name)
        return [
          text(['current: ', { b: ctx.theme }]),
          text(THEMES.flatMap((t, i) => [i ? '  ' : '', { cmd: `theme ${t.id}`, label: t.id }])),
        ];
      if (!THEMES.some((t) => t.id === name)) return err(`theme: unknown '${name}'`);
      ctx.setTheme(name);
      return [text(`✓ phosphor switched → ${name}`)];
    },
  },
  {
    name: 'sound',
    args: '[on|off]',
    complete: () => ['on', 'off'],
    desc: 'Toggle sound effects',
    run: ([v], ctx) => {
      const muted = v === 'on' ? false : v === 'off' ? true : !ctx.muted;
      ctx.setMuted(muted);
      return [text(`sound ${muted ? 'off' : 'on'}`)];
    },
  },
  {
    name: 'crt',
    args: '[on|off]',
    complete: () => ['on', 'off'],
    desc: 'Toggle CRT scanlines & flicker',
    run: ([v], ctx) => {
      const on = v === 'on' ? true : v === 'off' ? false : !ctx.crt;
      ctx.setCrt(on);
      return [text(`crt effects ${on ? 'on' : 'off'}`)];
    },
  },
  {
    name: 'history',
    desc: 'Command history',
    run: (_, ctx) =>
      ctx.history.length ? [{ type: 'table', rows: ctx.history.map((c, i) => [{ dim: String(i + 1) }, { cmd: c }]) }] : [text('(empty)', 'dim')],
  },
  { name: 'date', desc: 'Current date & time', run: () => [text(new Date().toString())] },
  { name: 'echo', args: '<text>', desc: 'Print text', run: (args) => [text(args.join(' '))] },
  { name: 'clear', desc: 'Clear the screen (Ctrl+L)', run: (_, ctx) => ctx.clear() },
  { name: 'reboot', desc: 'Restart ACLI-OS', run: (_, ctx) => ctx.reboot() },
  {
    name: 'exit',
    desc: 'Close this terminal',
    run: (_, ctx) => (ctx.closeSelf ? ctx.closeSelf() : [text('nowhere to exit to — this is home.', 'dim')]),
  },
  { name: 'sudo', hidden: true, run: () => err('akash is not in the sudoers file. This incident will be reported.') },
];

const byName = new Map();
COMMANDS.forEach((c) => [c.name, ...(c.aliases || [])].forEach((n) => byName.set(n, c)));

export const findCommand = (name) => byName.get(name);

function helpBlocks() {
  return [
    { type: 'heading', text: 'commands' },
    {
      type: 'table',
      rows: COMMANDS.filter((c) => !c.hidden).map((c) => [
        { cmd: c.name },
        { dim: c.args || '' },
        c.desc,
      ]),
    },
    { type: 'spacer' },
    text('TAB complete · ↑↓ history · Ctrl+L clear · Ctrl+C cancel · click any highlighted command', 'dim'),
  ];
}

export const tokenize = (line) => line.trim().split(/\s+/).filter(Boolean);

export const runCommand = (line, ctx) => {
  const [name, ...args] = tokenize(line);
  if (!name) return [];
  const cmd = findCommand(name.toLowerCase());
  if (!cmd) return err(`${name}: command not found. Type \`help\`.`);
  return cmd.run(args, ctx) || [];
};

// Completion candidates for the word under the cursor.
export const suggest = (line) => {
  const endsWithSpace = /\s$/.test(line);
  const words = tokenize(line);
  if (words.length === 0) return [];
  if (words.length === 1 && !endsWithSpace) {
    const prefix = words[0].toLowerCase();
    return [...byName.keys()].filter((n) => n.startsWith(prefix) && !findCommand(n).hidden && n !== prefix).sort();
  }
  const cmd = findCommand(words[0].toLowerCase());
  if (!cmd?.complete || words.length > 2 || (words.length === 2 && endsWithSpace)) return [];
  const prefix = endsWithSpace ? '' : words[1].toLowerCase();
  return cmd.complete().filter((o) => o.startsWith(prefix) && o !== prefix);
};

// Replace the word being completed with `choice`.
export const applySuggestion = (line, choice) => {
  const words = tokenize(line);
  if (/\s$/.test(line) || words.length === 0) return `${line}${choice} `;
  words[words.length - 1] = choice;
  return `${words.join(' ')} `;
};
