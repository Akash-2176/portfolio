import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { load, save, local } from './storage';
import { setMuted as setSoundMuted } from './sound';

export const THEMES = [
  { id: 'green', label: 'Green', swatch: '#33ff66' },
  { id: 'amber', label: 'Amber', swatch: '#ffb000' },
  { id: 'cyan', label: 'Cyan', swatch: '#3fe6ff' },
  { id: 'mono', label: 'Mono', swatch: '#e6e6e6' },
];

export const WALLPAPERS = [
  { id: 'blackhole', label: 'Black hole' },
  { id: 'synthwave', label: 'Synthwave' },
  { id: 'grid', label: 'Grid' },
];

// Art styles chosen on first visit: the retro OS or the modern site.
export const STYLES = ['retro', 'modern'];

const SettingsContext = createContext(null);

const usePersisted = (key, fallback) => {
  const [value, setValue] = useState(() => load(local, key, fallback));
  useEffect(() => save(local, key, value), [key, value]);
  return [value, setValue];
};

const oneOf = (list, setter) => (id) => {
  if (list.some((x) => (x.id ?? x) === id)) setter(id);
};

export const SettingsProvider = ({ children }) => {
  const [style, setStyleRaw] = usePersisted('style', null);
  const [theme, setThemeRaw] = usePersisted('theme', 'green');
  const [wallpaper, setWallpaperRaw] = usePersisted('wallpaper', 'blackhole');
  const [muted, setMuted] = usePersisted('muted', false);
  const [crt, setCrt] = usePersisted('crt', true);

  const setStyle = oneOf(STYLES, setStyleRaw);
  const setTheme = oneOf(THEMES, setThemeRaw);
  const setWallpaper = oneOf(WALLPAPERS, setWallpaperRaw);

  // Layout effects run before children's effects, so scenes read the new palette.
  useLayoutEffect(() => {
    document.documentElement.dataset.style = style ?? 'choose';
  }, [style]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  }, [theme]);

  useEffect(() => setSoundMuted(muted), [muted]);

  const value = { style, setStyle, theme, setTheme, wallpaper, setWallpaper, muted, setMuted, crt, setCrt };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
