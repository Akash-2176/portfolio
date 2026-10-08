import { useEffect, useState } from 'react';
import { Blocks } from '../blocks/Blocks';
import Terminal from '../terminal/Terminal';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { company, profile } from '../data/profile';
import {
  contactBlocks,
  educationBlocks,
  experienceBlocks,
  LOGO,
  projectBlocks,
  whoamiBlocks,
} from '../content/views';
import { THEMES, WALLPAPERS, useSettings } from '../system/settings';
import { play } from '../system/sound';
import './apps.css';

// Every app receives: { system, variant: 'desktop' | 'mobile', focused, props }

const Page = ({ children, className = '' }) => <div className={`app-page ${className}`}>{children}</div>;

const TerminalApp = ({ system, variant, focused }) => (
  <Terminal system={system} variant={variant} focused={focused} />
);

const About = () => (
  <Page>
    <pre className="app-logo" aria-hidden="true">{LOGO}</pre>
    <Blocks blocks={whoamiBlocks()} />
  </Page>
);

const Projects = ({ variant, props }) => {
  const [selected, setSelected] = useState(props?.slug ?? (variant === 'desktop' ? projects[0].slug : null));
  const current = projects.find((p) => p.slug === selected);
  // Re-opening the window with a slug (e.g. from the Featured widget) selects that project.
  useEffect(() => {
    if (props?.slug) setSelected(props.slug);
  }, [props?.slug]);
  const select = (slug) => {
    play('click');
    setSelected(slug);
  };

  const list = (
    <ul className="proj-list" role="listbox" aria-label="Projects">
      {projects.map((p) => (
        <li key={p.slug}>
          <button
            type="button"
            role="option"
            aria-selected={p.slug === selected}
            className={p.slug === selected ? 'active' : ''}
            onClick={() => select(p.slug)}
          >
            <span className="proj-name">▸ {p.name}</span>
            <span className={`proj-status s-${p.status.toLowerCase()}`}>● {p.status}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  if (variant === 'mobile') {
    return (
      <Page>
        {current ? (
          <>
            <button type="button" className="app-back" onClick={() => select(null)}>
              ‹ all projects
            </button>
            <Blocks blocks={projectBlocks(current)} />
          </>
        ) : (
          list
        )}
      </Page>
    );
  }

  return (
    <div className="proj-split">
      <div className="proj-pane">{list}</div>
      <div className="proj-detail">{current && <Blocks key={current.slug} blocks={projectBlocks(current)} reveal />}</div>
    </div>
  );
};

const Experience = () => (
  <Page>
    <Blocks blocks={[...experienceBlocks(), { type: 'spacer' }, ...educationBlocks()]} />
  </Page>
);

const Skills = () => (
  <Page>
    {skills.map((g) => (
      <section key={g.flag} className="skill-group">
        <h3 className="blk-heading">{g.label}</h3>
        <div className="skill-chips">
          {g.items.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>
    ))}
  </Page>
);

const Resume = () => (
  <Page className="center">
    <pre className="app-logo small" aria-hidden="true">{'┌──────────┐\n│ ▤▤▤▤▤▤▤▤ │\n│ ▤▤▤▤▤    │\n│ ▤▤▤▤▤▤▤  │\n│ ▤▤▤      │\n└──────────┘'}</pre>
    <p className="tone-dim">Resume.pdf — public copy coming soon.</p>
    <p>
      Meanwhile:{' '}
      <a className="blk-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </p>
  </Page>
);

const Contact = () => (
  <Page>
    <Blocks blocks={contactBlocks()} />
    <div className="app-actions">
      <a className="btn" href={`mailto:${profile.email}`} onClick={() => play('click')}>
        ✉ Send email
      </a>
      <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer" onClick={() => play('click')}>
        GitHub
      </a>
      <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer" onClick={() => play('click')}>
        LinkedIn
      </a>
      <a className="btn" href={company.url} target="_blank" rel="noopener" onClick={() => play('click')}>
        {company.name} ↗
      </a>
    </div>
  </Page>
);

const Toggle = ({ label, on, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    className="toggle"
    onClick={() => {
      onChange(!on);
      play('click');
    }}
  >
    <span>{label}</span>
    <span className="toggle-state">[{on ? '■ ON ' : ' OFF□'}]</span>
  </button>
);

export const ThemePicker = () => {
  const { theme, setTheme } = useSettings();
  return (
    <div className="theme-picker" role="radiogroup" aria-label="Phosphor color">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          className={theme === t.id ? 'active' : ''}
          onClick={() => {
            setTheme(t.id);
            play('click');
          }}
        >
          <span className="swatch" style={{ background: t.swatch }} />
          {t.label}
        </button>
      ))}
    </div>
  );
};

const WallpaperPicker = () => {
  const { wallpaper, setWallpaper } = useSettings();
  return (
    <div className="theme-picker" role="radiogroup" aria-label="Background">
      {WALLPAPERS.map((w) => (
        <button
          key={w.id}
          type="button"
          role="radio"
          aria-checked={wallpaper === w.id}
          className={wallpaper === w.id ? 'active' : ''}
          onClick={() => {
            setWallpaper(w.id);
            play('click');
          }}
        >
          {w.label}
        </button>
      ))}
    </div>
  );
};

export const SettingsPanel = ({ system }) => {
  const { muted, setMuted, crt, setCrt, setStyle } = useSettings();
  return (
    <>
      <h3 className="blk-heading">phosphor</h3>
      <ThemePicker />
      <h3 className="blk-heading">background</h3>
      <WallpaperPicker />
      <h3 className="blk-heading">system</h3>
      <Toggle label="Sound effects" on={!muted} onChange={(v) => setMuted(!v)} />
      <Toggle label="CRT scanlines & flicker" on={crt} onChange={setCrt} />
      <div className="app-actions">
        <button type="button" className="btn" onClick={() => system.reboot()}>
          ↻ Replay boot
        </button>
        <button type="button" className="btn" onClick={() => setStyle('modern')}>
          ✦ Switch to Modern style
        </button>
      </div>
    </>
  );
};

const Settings = ({ system }) => (
  <Page>
    <SettingsPanel system={system} />
  </Page>
);

export const APP_COMPONENTS = {
  terminal: TerminalApp,
  about: About,
  projects: Projects,
  experience: Experience,
  skills: Skills,
  resume: Resume,
  contact: Contact,
  settings: Settings,
};
