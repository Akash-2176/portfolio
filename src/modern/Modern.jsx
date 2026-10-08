import { useEffect, useRef, useState } from 'react';
import { activities, company, profile } from '../data/profile';
import { projects } from '../data/projects';
import { experience, education } from '../data/experience';
import { skills } from '../data/skills';
import { useSettings } from '../system/settings';
import Cursor from './Cursor';
import HeroField from './HeroField';
import {
  tiltHandlers,
  useActiveSection,
  useCountUp,
  useMagnetic,
  useReveal,
  useRotatingIndex,
  useScrollProgress,
} from './hooks';
import './modern.css';

const SECTIONS = ['home', 'studio', 'work', 'experience', 'skills', 'contact'];
const ROLES = ['backends that scale.', 'real-world systems.', `products at ${company.name}.`, 'AI that sees.'];
const ALL_SKILLS = skills.flatMap((g) => g.items);

const scrollTo = (id) => (e) => {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Magnetic = ({ as: Tag = 'a', className = '', children, ...rest }) => {
  const ref = useMagnetic();
  return (
    <Tag ref={ref} className={`magnetic ${className}`} {...rest}>
      <span>{children}</span>
    </Tag>
  );
};

const Nav = ({ active, onRetro }) => (
  <nav className="m-nav" aria-label="Sections">
    <a href="#home" className="m-logo" onClick={scrollTo('home')}>
      ak<span>.</span>
    </a>
    <div className="m-nav-links">
      {SECTIONS.slice(1).map((id) => (
        <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={scrollTo(id)}>
          {id}
        </a>
      ))}
    </div>
    <button type="button" className="m-retro" onClick={onRetro} data-cursor="Boot">
      <span aria-hidden="true">▣</span> Retro OS
    </button>
  </nav>
);

const Hero = () => {
  const role = useRotatingIndex(ROLES.length);
  return (
    <section id="home" className="m-hero">
      <HeroField />
      <div className="m-hero-inner">
        <a className="m-pill" href={company.url} target="_blank" rel="noopener" data-reveal data-cursor="Visit">
          <span className="m-dot" /> {company.role} @ <strong>{company.name}</strong> ↗
        </a>
        <h1 className="m-hero-title" aria-label={`${profile.name}, ${profile.title}`}>
          <span className="m-hero-name" aria-hidden="true">
            {[...profile.shortName].map((ch, i) => (
              <span key={i} style={{ '--i': i }}>
                {ch}
              </span>
            ))}
          </span>
          <span className="m-hero-role" aria-hidden="true">
            builds{' '}
            <span className="m-rotator">
              {ROLES.map((r, i) => (
                <span key={r} className={i === role ? 'on' : ''}>
                  {r}
                </span>
              ))}
            </span>
          </span>
        </h1>
        <p className="m-hero-sub" data-reveal>
          {profile.bio}
        </p>
        <div className="m-hero-ctas" data-reveal>
          <Magnetic href="#work" className="m-btn primary" onClick={scrollTo('work')}>
            View work ↓
          </Magnetic>
          <Magnetic href="#contact" className="m-btn" onClick={scrollTo('contact')}>
            Get in touch
          </Magnetic>
        </div>
      </div>
      <p className="m-hero-hint" aria-hidden="true">move · click · scroll</p>
    </section>
  );
};

const Marquee = () => (
  <div className="m-marquee" aria-label="Technologies">
    {[0, 1].map((row) => (
      <div key={row} className={`m-marquee-row${row ? ' reverse' : ''}`} aria-hidden={row ? 'true' : undefined}>
        {[0, 1].map((copy) => (
          <div key={copy} className="m-marquee-track" aria-hidden={copy ? 'true' : undefined}>
            {(row ? [...ALL_SKILLS].reverse() : ALL_SKILLS).map((s) => (
              <span key={s}>
                {s} <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Stat = ({ value, suffix = '', label }) => {
  const [ref, n] = useCountUp(value);
  return (
    <div className="m-stat" ref={ref} data-reveal>
      <strong>
        {n}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
};

const Stats = () => (
  <section className="m-stats" aria-label="At a glance">
    <Stat value={30} suffix="+" label="police stations live" />
    <Stat value={50} suffix="k+" label="monthly transactions" />
    <Stat value={35} suffix="%" label="latency cut at Intellect" />
    <Stat value={9} label="person team led" />
  </section>
);

const SectionHead = ({ kicker, title }) => (
  <header className="m-section-head" data-reveal>
    <span className="m-kicker">{kicker}</span>
    <h2>{title}</h2>
  </header>
);

const Studio = () => (
  <section id="studio" className="m-section">
    <div className="m-studio" data-reveal {...tiltHandlers}>
      <span className="m-card-spot" aria-hidden="true" />
      <div className="m-studio-copy">
        <span className="m-kicker">00 — The studio</span>
        <h2>
          I run <em>{company.name}</em>.
        </h2>
        <p className="m-studio-tagline">{company.tagline}</p>
        <p className="m-studio-body">
          As {company.role}, I lead every build end to end — from discovery to launch — for teams like Namakkal
          District Police and The Madras CA.
        </p>
        <div className="m-studio-ctas">
          <Magnetic href={company.url} className="m-btn primary" target="_blank" rel="noopener">
            Visit ezuraarc.com ↗
          </Magnetic>
          <Magnetic href={`${company.url}/portfolio`} className="m-btn" target="_blank" rel="noopener">
            Studio work ↗
          </Magnetic>
        </div>
      </div>
      <ul className="m-studio-facts">
        <li>
          <strong>Pvt Ltd</strong>
          <span>Registered in Tamil Nadu, {company.since}</span>
        </li>
        <li>
          <strong>3</strong>
          <span>Client platforms shipped</span>
        </li>
        <li>
          <strong>Karur</strong>
          <span>Based here, working across India</span>
        </li>
        <li className="m-studio-name">
          <span>எழு Ezhu · rise</span>
          <span>Aura · presence</span>
          <span>Arc · the path of growth</span>
        </li>
      </ul>
    </div>
  </section>
);

const ProjectCard = ({ project, index, onOpen }) => (
  <button
    type="button"
    className={`m-card${index === 0 ? ' featured' : ''}`}
    data-reveal
    data-cursor="Open"
    style={{ '--d': `${(index % 3) * 80}ms` }}
    onClick={() => onOpen(project)}
    {...tiltHandlers}
  >
    <span className="m-card-spot" aria-hidden="true" />
    <span className="m-card-top">
      <span className="m-card-index">{String(index + 1).padStart(2, '0')}</span>
      <span className={`m-status s-${project.status.toLowerCase()}`}>{project.status}</span>
    </span>
    <span className="m-card-name">{project.name}</span>
    <span className="m-card-org">
      {project.org}
      {project.ezura && <span className="m-via"> · via {company.name}</span>}
    </span>
    <span className="m-card-summary">{project.summary}</span>
    <span className="m-tags">
      {project.stack.slice(0, index === 0 ? 5 : 3).map((s) => (
        <span key={s}>{s}</span>
      ))}
    </span>
    <span className="m-card-arrow" aria-hidden="true">↗</span>
  </button>
);

const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="m-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="m-modal" role="dialog" aria-modal="true" aria-labelledby="m-modal-title">
        <button ref={closeRef} type="button" className="m-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <span className={`m-status s-${project.status.toLowerCase()}`}>{project.status}</span>
        <h3 id="m-modal-title">{project.name}</h3>
        <p className="m-modal-org">
          {project.org}
          {project.ezura && (
            <>
              {' · built by '}
              <a href={company.url} target="_blank" rel="noopener">
                {company.name} ↗
              </a>
            </>
          )}
        </p>
        <p className="m-modal-summary">{project.summary}</p>
        <div className="m-modal-grid">
          <div>
            <h4>Highlights</h4>
            <ul>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Impact</h4>
            <p>{project.impact}</p>
            <h4>Stack</h4>
            <div className="m-tags">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        {project.links.length > 0 && (
          <div className="m-modal-links">
            {project.links.map((l, i) => (
              <a key={l.href} className={`m-btn${i === 0 ? ' primary' : ''}`} href={l.href} target="_blank" rel="noopener">
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="m-section">
      <SectionHead kicker="01 — Selected work" title="Things I've built" />
      <div className="m-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} onOpen={setOpen} />
        ))}
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

const Experience = () => {
  const ref = useRef(null);
  // Timeline line fills as the section scrolls through the viewport.
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty('--fill', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const items = [
    ...experience.map((e) => ({ title: e.role, org: e.company, url: e.url, period: e.period, points: e.points })),
    ...education.map((e) => ({ title: e.degree, org: e.school, period: e.period, points: [e.detail] })),
  ];

  return (
    <section id="experience" className="m-section">
      <SectionHead kicker="02 — Experience" title="Where I've worked" />
      <ol className="m-timeline" ref={ref}>
        {items.map((it) => (
          <li key={it.org + it.title} data-reveal>
            <span className="m-node" aria-hidden="true" />
            <div className="m-tl-head">
              <h3>{it.title}</h3>
              {it.period && <span>{it.period}</span>}
            </div>
            <p className="m-tl-org">
              {it.url ? (
                <a href={it.url} target="_blank" rel="noopener">
                  {it.org} ↗
                </a>
              ) : (
                it.org
              )}
            </p>
            <ul>
              {it.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className="m-beyond" data-reveal>
        <h3>Beyond code</h3>
        <ul>
          {activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Skills = () => {
  const [group, setGroup] = useState('all');
  const shown = group === 'all' ? skills : skills.filter((g) => g.flag === group);
  return (
    <section id="skills" className="m-section">
      <SectionHead kicker="03 — Toolkit" title="What I work with" />
      <div className="m-filters" role="tablist" aria-label="Skill groups" data-reveal>
        {[{ flag: 'all', label: 'All' }, ...skills].map((g) => (
          <button
            key={g.flag}
            type="button"
            role="tab"
            aria-selected={group === g.flag}
            className={group === g.flag ? 'active' : ''}
            onClick={() => setGroup(g.flag)}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="m-skill-groups" key={group}>
        {shown.map((g, gi) => (
          <div key={g.flag} className="m-skill-group" {...tiltHandlers}>
            <span className="m-card-spot" aria-hidden="true" />
            <h3>{g.label}</h3>
            <div className="m-chips">
              {g.items.map((s, i) => (
                <span key={s} style={{ '--i': gi * 3 + i }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = ({ onRetro }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <section id="contact" className="m-section m-contact">
      <span className="m-kicker" data-reveal>04 — Contact</span>
      <h2 className="m-contact-title" data-reveal>
        Let's build something <em>real.</em>
      </h2>
      <div className="m-contact-actions" data-reveal>
        <Magnetic as="button" type="button" className="m-btn primary big" onClick={copy} data-cursor={copied ? 'Copied' : 'Copy'}>
          {copied ? '✓ Copied to clipboard' : profile.email}
        </Magnetic>
        <Magnetic href={profile.links.github} className="m-btn big" target="_blank" rel="noreferrer">
          GitHub ↗
        </Magnetic>
        <Magnetic href={profile.links.linkedin} className="m-btn big" target="_blank" rel="noreferrer">
          LinkedIn ↗
        </Magnetic>
        <Magnetic href={company.url} className="m-btn big" target="_blank" rel="noopener">
          {company.name} ↗
        </Magnetic>
      </div>
      <footer className="m-footer">
        <span>
          © {new Date().getFullYear()} {profile.name} ·{' '}
          <a href={company.url} target="_blank" rel="noopener">
            {company.role}, {company.name}
          </a>
        </span>
        <button type="button" onClick={onRetro}>
          Prefer a terminal? <u>Boot the Retro OS</u> ▣
        </button>
      </footer>
    </section>
  );
};

export default function Modern() {
  const { setStyle } = useSettings();
  const root = useRef(null);
  const active = useActiveSection(SECTIONS);
  useReveal(root);
  useScrollProgress();

  useEffect(() => {
    document.title = `Akash M G — ${profile.headline}`;
    return () => {
      document.title = 'Akash M G — Backend Engineer · Founder & CEO, EzuraArc';
    };
  }, []);

  const toRetro = () => {
    window.scrollTo(0, 0);
    setStyle('retro');
  };

  return (
    <div className="modern" ref={root}>
      <div className="m-progress" aria-hidden="true" />
      <div className="m-aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="m-grain" aria-hidden="true" />
      <Cursor />
      <Nav active={active} onRetro={toRetro} />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Studio />
        <Work />
        <Experience />
        <Skills />
        <Contact onRetro={toRetro} />
      </main>
    </div>
  );
}
