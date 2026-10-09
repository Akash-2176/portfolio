import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { APPS, getApp } from '../apps/meta';
import { APP_COMPONENTS } from '../apps/apps';
import { THEMES, WALLPAPERS, useSettings } from '../system/settings';
import Wallpaper from '../wallpapers/Wallpaper';
import Widgets from './Widgets';
import { useClock, useCoarsePointer } from '../system/hooks';
import { play } from '../system/sound';
import Window from './Window';
import { focusedWindow, initialWindows, windowsReducer } from './windows';
import './desktop.css';

const TopBar = ({ title, onMenu }) => {
  const { theme, setTheme, muted, setMuted, wallpaper, setWallpaper } = useSettings();
  const clock = useClock();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => !menuRef.current?.contains(e.target) && setOpen(false);
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [open]);

  const pick = (action) => {
    setOpen(false);
    onMenu(action);
  };

  return (
    <header className="topbar">
      <div className="topbar-menu" ref={menuRef}>
        <button type="button" className="topbar-logo" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((v) => !v)}>
          ▣ ACLI-OS
        </button>
        {open && (
          <div className="menu" role="menu">
            <button role="menuitem" type="button" onClick={() => pick('about')}>About Akash</button>
            <button role="menuitem" type="button" onClick={() => pick('terminal')}>New Terminal</button>
            <button role="menuitem" type="button" onClick={() => pick('settings')}>Settings…</button>
            <hr />
            <button role="menuitem" type="button" onClick={() => pick('modern')}>Switch to Modern style</button>
            <button role="menuitem" type="button" onClick={() => pick('reboot')}>Restart…</button>
          </div>
        )}
      </div>
      <span className="topbar-title">{title}</span>
      <div className="topbar-right">
        <button
          type="button"
          className="topbar-btn"
          title="Change background"
          onClick={() => {
            const i = WALLPAPERS.findIndex((w) => w.id === wallpaper);
            setWallpaper(WALLPAPERS[(i + 1) % WALLPAPERS.length].id);
            play('click');
          }}
        >
          BG: {WALLPAPERS.find((w) => w.id === wallpaper)?.label}
        </button>
        <span className="topbar-themes" role="radiogroup" aria-label="Phosphor color">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={theme === t.id}
              aria-label={`${t.label} phosphor`}
              title={`${t.label} phosphor`}
              className={theme === t.id ? 'active' : ''}
              style={{ '--sw': t.swatch }}
              onClick={() => {
                setTheme(t.id);
                play('click');
              }}
            />
          ))}
        </span>
        <button
          type="button"
          className="topbar-btn"
          aria-pressed={!muted}
          title={muted ? 'Sound off' : 'Sound on'}
          onClick={() => setMuted(!muted)}
        >
          {muted ? 'SND ×' : 'SND ♪'}
        </button>
        <span className="topbar-clock">{clock}</span>
      </div>
    </header>
  );
};

// Mouse: click selects, double-click opens. Touch: a single tap opens.
const Icon = ({ app, selected, onSelect, onOpen, tapToOpen }) => (
  <button
    type="button"
    className={`icon${selected ? ' selected' : ''}`}
    onClick={() => {
      if (tapToOpen) return onOpen(app.id);
      onSelect(app.id);
      return play('click');
    }}
    onDoubleClick={() => onOpen(app.id)}
    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onOpen(app.id))}
    title={tapToOpen ? `Open ${app.title}` : `Double-click to open ${app.title}`}
  >
    <span className="icon-glyph" aria-hidden="true">{app.glyph}</span>
    <span className="icon-label">{app.file}</span>
  </button>
);

export default function Desktop({ reboot }) {
  const { setStyle } = useSettings();
  const tapToOpen = useCoarsePointer();
  const [state, dispatch] = useReducer(windowsReducer, initialWindows);
  const [selected, setSelected] = useState(null);
  const areaRef = useRef(null);
  const iconsRef = useRef(null);
  const [bounds, setBounds] = useState({ w: window.innerWidth, h: window.innerHeight - 72 });

  useEffect(() => {
    const el = areaRef.current;
    const measure = () => {
      setBounds({ w: el.clientWidth, h: el.clientHeight });
      dispatch({ type: 'fit', bw: el.clientWidth, bh: el.clientHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const openApp = useCallback((appId, props) => {
    play('open');
    dispatch({ type: 'open', appId, props, viewport: { vw: window.innerWidth, vh: window.innerHeight } });
  }, []);

  const closeApp = useCallback((appId) => {
    play('close');
    dispatch({ type: 'close', appId });
  }, []);

  // Land with the terminal open, docked bottom-left beside the icons so the wallpaper stays visible.
  useEffect(() => {
    const area = areaRef.current;
    const left = (iconsRef.current?.offsetLeft ?? 16) + (iconsRef.current?.offsetWidth ?? 96) + 20;
    const share = area.clientWidth >= 1100 ? 0.42 : 0.52;
    const w = Math.min(600, Math.max(340, area.clientWidth * share), area.clientWidth - left - 16);
    const h = Math.min(380, Math.max(240, area.clientHeight * 0.52));
    const rect = { x: left, y: Math.max(12, area.clientHeight - h - 20), w, h };
    dispatch({ type: 'open', appId: 'terminal', rect, viewport: { vw: window.innerWidth, vh: window.innerHeight } });
  }, []);

  const focused = focusedWindow(state.windows);

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && (e.key === 'w' || e.key === 'W') && focused) {
        e.preventDefault();
        closeApp(focused.appId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, closeApp]);

  // Stable per-app system objects so app components don't re-render needlessly.
  const systems = useMemo(
    () =>
      Object.fromEntries(
        APPS.map((a) => [a.id, { openApp, reboot, closeSelf: () => closeApp(a.id) }]),
      ),
    [openApp, closeApp, reboot],
  );

  const onMenu = (action) => {
    if (action === 'reboot') reboot();
    else if (action === 'modern') setStyle('modern');
    else openApp(action);
  };

  return (
    <div className="desktop power-on">
      <TopBar title={focused ? getApp(focused.appId).title : 'Desktop'} onMenu={onMenu} />

      <main className="workspace" ref={areaRef} onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
        <Wallpaper />

        <nav className="icons" aria-label="Desktop" ref={iconsRef}>
          {APPS.map((app) => (
            <Icon key={app.id} app={app} selected={selected === app.id} onSelect={setSelected} onOpen={openApp} tapToOpen={tapToOpen} />
          ))}
        </nav>

        <div className="wallpaper-mark" aria-hidden="true">ACLI-OS</div>

        <Widgets openApp={openApp} />

        {state.windows.map((win) => {
          const App = APP_COMPONENTS[win.appId];
          const isFocused = focused?.appId === win.appId;
          return (
            <Window key={win.appId} win={win} focused={isFocused} bounds={bounds} dispatch={dispatch} onClose={() => closeApp(win.appId)}>
              <App system={systems[win.appId]} variant="desktop" focused={isFocused} props={win.props} />
            </Window>
          );
        })}
      </main>

      <footer className="taskbar">
        {state.windows.map((win) => {
          const app = getApp(win.appId);
          const isFocused = focused?.appId === win.appId;
          return (
            <button
              key={win.appId}
              type="button"
              className={`task${isFocused ? ' active' : ''}${win.minimized ? ' minimized' : ''}`}
              onClick={() => dispatch({ type: isFocused ? 'minimize' : 'focus', appId: win.appId })}
            >
              <span aria-hidden="true">{app.glyph}</span> {app.title}
            </button>
          );
        })}
        <span className="taskbar-hint">
          {tapToOpen ? 'tap' : 'double-click'} an icon · or type <b>help</b>
        </span>
      </footer>
    </div>
  );
}
