import { useEffect, useRef, useState } from 'react';
import { LOGO } from '../content/views';
import { play } from '../system/sound';
import './boot.css';

const LINES = [
  'ACLI BIOS v2.0 · (c) Akash',
  'Memory test ........... 640K OK',
  'Detecting phosphor .... OK',
  'Mounting /home/ak ..... OK',
  'Loading window manager  OK',
  'Starting ACLI-OS',
];

/**
 * Boot screen. `quick` (returning visitor / reduced motion) skips straight to a short power-on.
 * Any key, click or tap skips.
 */
export default function Boot({ quick, onDone }) {
  const [shown, setShown] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    play('power');
    if (quick) {
      at(450, finish);
    } else {
      at(500, () => play('boot'));
      LINES.forEach((_, i) => at(700 + i * 210, () => setShown(i + 1)));
      const end = 700 + LINES.length * 210 + 150;
      at(end, () => {
        setGlitch(true);
        play('glitch');
      });
      at(end + 260, finish);
    }

    const skip = (e) => {
      if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      finish();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [quick, onDone]);

  return (
    <div className={`boot power-on${glitch ? ' boot-glitch' : ''}`} role="status" aria-label="Booting ACLI-OS">
      {!quick && (
        <div className="boot-inner">
          <pre className="boot-logo" aria-hidden="true">{LOGO}</pre>
          <div className="boot-lines">
            {LINES.slice(0, shown).map((l) => (
              <div key={l}>{l}</div>
            ))}
            {shown < LINES.length && <span className="boot-cursor">█</span>}
          </div>
          <div className="boot-skip">press any key to skip ▸</div>
        </div>
      )}
    </div>
  );
}
