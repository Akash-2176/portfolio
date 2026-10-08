// Tiny Web Audio synth — every effect is generated, no audio files.
let ctx = null;
let master = null;
let muted = false;

const getCtx = () => {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

export const setMuted = (value) => {
  muted = value;
};

// Browsers block audio until a user gesture; unlock on the first one.
export const unlockAudio = () => {
  const handler = () => {
    getCtx();
    window.removeEventListener('pointerdown', handler);
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('pointerdown', handler);
  window.addEventListener('keydown', handler);
};

const tone = (c, { type = 'square', freq, to, start = 0, dur, gain = 0.2 }) => {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
};

const noise = (c, { start = 0, dur, gain = 0.15, freq = 3000, q = 1 }) => {
  const t = c.currentTime + start;
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buffer = c.createBuffer(1, len, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(g).connect(master);
  src.start(t);
};

const effects = {
  // CRT degauss thunk + rising whine
  power: (c) => {
    tone(c, { type: 'sine', freq: 55, to: 40, dur: 0.5, gain: 0.5 });
    noise(c, { dur: 0.35, gain: 0.2, freq: 200, q: 0.7 });
    tone(c, { type: 'sawtooth', freq: 200, to: 2400, start: 0.05, dur: 0.6, gain: 0.03 });
  },
  boot: (c) => {
    tone(c, { freq: 988, dur: 0.09, gain: 0.12 });
    tone(c, { freq: 1319, start: 0.1, dur: 0.14, gain: 0.12 });
  },
  key: (c) => noise(c, { dur: 0.025, gain: 0.25, freq: 2500 + Math.random() * 1500, q: 3 }),
  enter: (c) => noise(c, { dur: 0.05, gain: 0.35, freq: 1200, q: 2 }),
  open: (c) => {
    tone(c, { freq: 523, dur: 0.06, gain: 0.1 });
    tone(c, { freq: 784, start: 0.06, dur: 0.08, gain: 0.1 });
  },
  close: (c) => {
    tone(c, { freq: 784, dur: 0.06, gain: 0.1 });
    tone(c, { freq: 523, start: 0.06, dur: 0.08, gain: 0.1 });
  },
  click: (c) => tone(c, { freq: 1800, dur: 0.02, gain: 0.06 }),
  error: (c) => tone(c, { type: 'sawtooth', freq: 140, dur: 0.22, gain: 0.12 }),
  glitch: (c) => noise(c, { dur: 0.25, gain: 0.25, freq: 4000, q: 0.3 }),
};

export const play = (name) => {
  if (muted) return;
  const effect = effects[name];
  const c = effect && getCtx();
  if (!c || c.state !== 'running') return;
  try {
    effect(c);
  } catch {
    /* audio is best-effort */
  }
};
