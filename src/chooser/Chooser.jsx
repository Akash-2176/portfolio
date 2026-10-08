import { useState } from 'react';
import { useSettings } from '../system/settings';
import { profile } from '../data/profile';
import './chooser.css';

const RETRO_LINES = ['ACLI BIOS v2.0', 'Memory test ..... 640K OK', 'Starting ACLI-OS', 'ak@acli:~$ whoami'];

/** First-visit screen: pick the retro OS or the modern site. The choice is remembered. */
export default function Chooser({ preload }) {
  const { setStyle } = useSettings();
  const [hover, setHover] = useState(null);

  const side = (id) => ({
    onPointerEnter: () => {
      setHover(id);
      preload?.(id);
    },
    onPointerLeave: () => setHover(null),
    onFocus: () => {
      setHover(id);
      preload?.(id);
    },
    onClick: () => setStyle(id),
  });

  const onModernMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className={`chooser${hover ? ` hover-${hover}` : ''}`}>
      <header className="chooser-head">
        <span>{profile.name}'s portfolio</span>
        <strong>Choose your experience</strong>
      </header>

      <button type="button" className="choice choice-retro" {...side('retro')} aria-label="Retro OS: boot a CRT desktop">
        <span className="retro-screen" aria-hidden="true">
          {RETRO_LINES.map((l, i) => (
            <span key={l} className="retro-line" style={{ '--i': i }}>
              {l}
            </span>
          ))}
          <span className="retro-cursor">█</span>
        </span>
        <span className="choice-body">
          <span className="choice-kicker">01 · Retro</span>
          <span className="choice-title">ACLI-OS</span>
          <span className="choice-desc">Boot a CRT desktop. Windows, a real terminal, sound and phosphor glow.</span>
          <span className="choice-cta">[ BOOT ▸ ]</span>
        </span>
      </button>

      <button
        type="button"
        className="choice choice-modern"
        {...side('modern')}
        onPointerMove={onModernMove}
        aria-label="Modern: an immersive interactive portfolio"
      >
        <span className="modern-aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="modern-spot" aria-hidden="true" />
        <span className="choice-body">
          <span className="choice-kicker">02 · Modern</span>
          <span className="choice-title">Immersive</span>
          <span className="choice-desc">A fluid, interactive portfolio. Motion, depth and everything at a glance.</span>
          <span className="choice-cta">Enter →</span>
        </span>
      </button>

      <footer className="chooser-foot">You can switch styles anytime.</footer>
    </div>
  );
}
