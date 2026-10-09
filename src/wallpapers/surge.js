// Irregular "surges" that make ambient motion feel alive instead of looping:
// every few seconds a burst eases in and out with a random strength and length.
const rand = (a, b) => a + Math.random() * (b - a);

export function createSurge({ gap = [5000, 12000], length = [1800, 3400] } = {}) {
  let start = -1;
  let next = rand(1500, 4000); // first one comes early
  let dur = 0;
  let amp = 0;

  // Returns 0..1 for time t (ms since page load).
  return (t) => {
    if (start < 0) {
      if (t < next) return 0;
      start = t;
      dur = rand(...length);
      amp = rand(0.45, 1);
    }
    const p = (t - start) / dur;
    if (p >= 1) {
      start = -1;
      next = t + rand(...gap);
      return 0;
    }
    return amp * Math.sin(Math.PI * p) ** 2;
  };
}

// Integrates a speed that varies with the surge, so phase never jumps.
export function createFlow(base, boost) {
  const surge = createSurge();
  let phase = 0;
  let level = 0;
  return {
    step(t, dt) {
      level = surge(t);
      phase += (dt / 1000) * base * (1 + boost * level);
      return phase;
    },
    get level() {
      return level;
    },
  };
}
