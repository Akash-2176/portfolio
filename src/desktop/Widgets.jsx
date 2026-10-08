import { useEffect, useRef, useState } from 'react';
import { company, profile } from '../data/profile';
import { projects } from '../data/projects';
import { WALLPAPERS, useSettings } from '../system/settings';
import './widgets.css';

// Conky-style desktop widgets: they keep the desktop alive when no windows are open.

const useTick = (ms) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return n;
};

const pad = (n) => String(n).padStart(2, '0');
const bar = (pct, len = 14) => '█'.repeat(Math.round((pct / 100) * len)).padEnd(len, '░');

const Widget = ({ title, className = '', children }) => (
  <section className={`widget ${className}`} aria-label={title}>
    <header className="widget-title">{title}</header>
    {children}
  </section>
);

const Clock = () => {
  useTick(1000);
  const start = useRef(Date.now());
  const now = new Date();
  const up = Math.floor((Date.now() - start.current) / 1000);
  return (
    <Widget title="clock" className="w-clock">
      <div className="w-time">
        {pad(now.getHours())}:{pad(now.getMinutes())}
        <span>:{pad(now.getSeconds())}</span>
      </div>
      <div className="w-dim">
        {now.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
      </div>
      <div className="w-dim">
        uptime {pad(Math.floor(up / 3600))}:{pad(Math.floor(up / 60) % 60)}:{pad(up % 60)}
      </div>
    </Widget>
  );
};

const Profile = ({ openApp }) => (
  <Widget title="user" className="w-profile">
    <div className="w-name">{profile.name}</div>
    <div>{profile.title}</div>
    <a className="w-company" href={company.url} target="_blank" rel="noopener">
      {company.role} @ {company.name} ↗
    </a>
    <div className="w-dim">{profile.location}</div>
    <div className="w-status">
      <span className="w-led" aria-hidden="true" /> open to work
    </div>
    <div className="w-actions">
      <button type="button" onClick={() => openApp('about')}>whoami</button>
      <button type="button" onClick={() => openApp('projects')}>projects</button>
      <button type="button" onClick={() => openApp('contact')}>contact</button>
    </div>
  </Widget>
);

const Featured = ({ openApp }) => {
  const i = useTick(7000) % projects.length;
  const p = projects[i];
  return (
    <Widget title={`featured ${i + 1}/${projects.length}`} className="w-featured">
      <button type="button" className="w-feature" key={p.slug} onClick={() => openApp('projects', { slug: p.slug })}>
        <span className="w-feature-name">▸ {p.name}</span>
        <span className="w-dim">● {p.status} · {p.stack.slice(0, 3).join(' · ')}</span>
        <span>{p.summary}</span>
        <span className="w-progress" aria-hidden="true" />
      </button>
    </Widget>
  );
};

const METERS = ['cpu', 'mem', 'net', 'grav'];
const Sys = () => {
  const { theme, wallpaper } = useSettings();
  const [values, setValues] = useState(() => METERS.map(() => 30 + Math.random() * 40));
  useEffect(() => {
    const id = setInterval(
      () => setValues((vs) => vs.map((v) => Math.min(98, Math.max(4, v + (Math.random() - 0.5) * 22)))),
      900,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <Widget title="sys" className="w-sys">
      {METERS.map((m, k) => (
        <div key={m} className="w-meter">
          <span>{m.padEnd(4)}</span>
          <span className="w-bar">{bar(values[k])}</span>
          <span>{String(Math.round(values[k])).padStart(3)}%</span>
        </div>
      ))}
      <div className="w-dim">
        phosphor {theme} · bg {WALLPAPERS.find((w) => w.id === wallpaper)?.label.toLowerCase()}
      </div>
    </Widget>
  );
};

const EVENTS = [
  '[ok] lensing kernel compiled',
  '[net] ping github.com 32ms',
  '[api] GET /projects 200 12ms',
  '[gps] 12 field units reporting',
  '[ai] plant-disease cnn loaded',
  '[cron] repo backup complete',
  '[tel] MCC 404 · MNC 45 · LAC 1201',
  '[lambda] coupon-fn warm 38ms',
  '[spring] order-service healthy',
  '[disk] accretion temp 1e7 K',
  '[deploy] police-portal → ec2 ✓',
  '[ezuraarc] new enquiry received',
  '[sqs] tmca upload queue drained',
  '[intellect] latency −35% ✓',
  '[db] postgres vacuum done',
  '[sys] photon ring stable',
];
const stamp = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const Log = () => {
  const [lines, setLines] = useState(() => EVENTS.slice(0, 4).map((e, i) => ({ id: i, t: stamp(), e })));
  useEffect(() => {
    let id = 100;
    const timer = setInterval(() => {
      const e = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setLines((ls) => [...ls.slice(-6), { id: id++, t: stamp(), e }]);
    }, 2600);
    return () => clearInterval(timer);
  }, []);
  return (
    <Widget title="tail -f /var/log/acli" className="w-log">
      <div className="w-log-lines">
        {lines.map((l) => (
          <div key={l.id} className="w-log-line">
            <span className="w-dim">{l.t}</span> {l.e}
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default function Widgets({ openApp }) {
  return (
    <aside className="widgets" aria-label="Desktop widgets">
      <Clock />
      <Profile openApp={openApp} />
      <Featured openApp={openApp} />
      <Sys />
      <Log />
    </aside>
  );
}
