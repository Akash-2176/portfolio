import { createContext, useContext, useEffect, useState } from 'react';
import { load, save, local } from './storage';
import { setMuted as setSoundMuted } from './sound';

export const THEMES = [
  { id: 'green', label: 'Green', swatch: '#33ff66' },
  { id: 'amber', label: 'Amber', swatch: '#ffb000' },
  { id: 'cyan', label: 'Cyan', swatch: '#3fe6ff' },
  { id: 'mono', label: 'Mono', swatch: '#e6e6e6' },
];

const SettingsContext = createContext(null);

const usePersisted = (key, fallback) => {
  const [value, setValue] = useState(() => load(local, key, fallback));
  useEffect(() => save(local, key, value), [key, value]);
  return [value, setValue];
};

export const SettingsProvider = ({ children }) => {
  const [theme, setThemeRaw] = usePersisted('theme', 'green');
  const [muted, setMuted] = usePersisted('muted', false);
  const [crt, setCrt] = usePersisted('crt', true);

  const setTheme = (id) => {
    if (THEMES.some((t) => t.id === id)) setThemeRaw(id);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  }, [theme]);

  useEffect(() => setSoundMuted(muted), [muted]);

  const value = { theme, setTheme, muted, setMuted, crt, setCrt };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
