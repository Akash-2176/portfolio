import { useCallback, useMemo, useState } from 'react';
import { APPS, getApp } from '../apps/meta';
import { APP_COMPONENTS, SettingsPanel } from '../apps/apps';
import { profile } from '../data/profile';
import { useClock } from '../system/hooks';
import { play } from '../system/sound';
import './handheld.css';

// Settings lives in the ☰ sheet, so it isn't on the home grid.
const HOME_APPS = APPS.filter((a) => a.id !== 'settings');
const LABELS = { terminal: 'Term', about: 'whoami', projects: 'Projx', experience: 'Work', skills: 'Skills', resume: 'Resume', contact: 'Mail' };

export default function Handheld({ reboot }) {
  const clock = useClock();
  const [stack, setStack] = useState([]); // [{ appId, props }]
  const [sheet, setSheet] = useState(false);
  const current = stack[stack.length - 1];

  const openApp = useCallback((appId, props) => {
    play('open');
    setSheet(false);
    setStack((s) => [...s.filter((e) => e.appId !== appId), { appId, props }]);
  }, []);

  const back = () => {
    if (sheet) return setSheet(false);
    if (!stack.length) return undefined;
    play('close');
    return setStack((s) => s.slice(0, -1));
  };

  const home = () => {
    setSheet(false);
    if (stack.length) play('close');
    setStack([]);
  };

  const system = useMemo(() => ({ openApp, reboot, closeSelf: () => setStack((s) => s.slice(0, -1)) }), [openApp, reboot]);

  const App = current && APP_COMPONENTS[current.appId];

  return (
    <div className="handheld power-on">
      <header className="hh-status">
        <span>ACLI-OS</span>
        <span className="hh-status-title">{current ? getApp(current.appId).title : ''}</span>
        <span aria-hidden="true">▮▮▮</span>
        <span>{clock}</span>
      </header>

      <main className="hh-screen phosphor-grid">
        {App ? (
          <div className="hh-app" key={current.appId}>
            <App system={system} variant="mobile" focused props={current.props} />
          </div>
        ) : (
          <div className="hh-home">
            <div className="hh-hello">
              <div className="hh-name">{profile.name}</div>
              <div className="tone-dim">{profile.title}</div>
            </div>
            <nav className="hh-grid" aria-label="Apps">
              {HOME_APPS.map((app) => (
                <button key={app.id} type="button" className="hh-tile" onClick={() => openApp(app.id)}>
                  <span className="hh-tile-glyph" aria-hidden="true">{app.glyph}</span>
                  <span className="hh-tile-label">{LABELS[app.id] ?? app.title}</span>
                </button>
              ))}
            </nav>
            <p className="hh-tip tone-dim">tap an app · ☰ for theme & sound</p>
          </div>
        )}

        {sheet && (
          <div className="hh-sheet" role="dialog" aria-label="System menu">
            <SettingsPanel system={system} />
          </div>
        )}
      </main>

      <nav className="hh-nav" aria-label="Navigation">
        <button type="button" onClick={home} aria-current={!current && !sheet ? 'page' : undefined}>
          HOME
        </button>
        <button type="button" onClick={back} disabled={!current && !sheet}>
          ◀ BACK
        </button>
        <button
          type="button"
          aria-expanded={sheet}
          onClick={() => {
            play('click');
            setSheet((v) => !v);
          }}
        >
          ☰
        </button>
      </nav>
    </div>
  );
}
