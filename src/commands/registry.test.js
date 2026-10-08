import { describe, expect, it, vi } from 'vitest';
import { applySuggestion, COMMANDS, runCommand, suggest } from './registry';
import { skills } from '../data/skills';

const ctx = () => ({
  openApp: vi.fn(),
  reboot: vi.fn(),
  clear: vi.fn(),
  theme: 'green',
  setTheme: vi.fn(),
  muted: false,
  setMuted: vi.fn(),
  crt: true,
  setCrt: vi.fn(),
  wallpaper: 'blackhole',
  setWallpaper: vi.fn(),
  setStyle: vi.fn(),
  history: ['help'],
  device: 'desktop',
});

describe('command registry', () => {
  it.each(COMMANDS.filter((c) => !['clear', 'reboot', 'open'].includes(c.name)).map((c) => c.name))(
    '`%s` runs without throwing and returns blocks',
    (name) => {
      const out = runCommand(name, ctx());
      expect(Array.isArray(out)).toBe(true);
    },
  );

  it('every documented skills flag works', () => {
    skills.forEach((g) => {
      const out = runCommand(`skills --${g.flag}`, ctx());
      expect(out[0]).toMatchObject({ type: 'heading', text: g.label });
    });
  });

  it('reports unknown commands', () => {
    expect(runCommand('nope', ctx())[0].tone).toBe('error');
  });

  it('opens apps by id or file name', () => {
    const c = ctx();
    runCommand('open work.log', c);
    expect(c.openApp).toHaveBeenCalledWith('experience');
  });

  it('switches theme', () => {
    const c = ctx();
    runCommand('theme amber', c);
    expect(c.setTheme).toHaveBeenCalledWith('amber');
  });

  it('switches wallpaper and art style', () => {
    const c = ctx();
    runCommand('wallpaper synthwave', c);
    expect(c.setWallpaper).toHaveBeenCalledWith('synthwave');
    expect(runCommand('wallpaper nope', c)[0].tone).toBe('error');
    runCommand('style modern', c);
    expect(c.setStyle).toHaveBeenCalledWith('modern');
  });

  it('shows a project by number', () => {
    expect(runCommand('projects 1', ctx())[0]).toMatchObject({ type: 'heading' });
    expect(runCommand('projects 99', ctx())[0].tone).toBe('error');
  });
});

describe('autocomplete', () => {
  it('completes command names', () => {
    expect(suggest('pro')).toEqual(['project', 'projects']);
    expect(suggest('who')).toEqual(['whoami']);
  });

  it('completes arguments', () => {
    expect(suggest('theme a')).toEqual(['amber']);
    expect(suggest('skills --d')).toEqual(['--databases']);
  });

  it('applies a suggestion to the last word', () => {
    expect(applySuggestion('theme a', 'amber')).toBe('theme amber ');
    expect(applySuggestion('who', 'whoami')).toBe('whoami ');
  });
});
