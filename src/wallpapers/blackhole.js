import { mix, rgba } from './colors';

const TAU = Math.PI * 2;
const WHITE = [255, 255, 255];

/**
 * Black hole: a glowing tilted accretion disk with swirling streaks, the disk's far side
 * lensed into a halo around the horizon, and a starfield bent by gravity.
 * Draw order: back half of disk → halo → horizon → photon ring → front half of disk.
 */
export function blackhole(ctx, palette) {
  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let R = 0;

  const hot = mix(palette.accent, WHITE, 0.55);
  const warm = mix(palette.fg, palette.accent, 0.35);
  const TILT = 0.2;

  const stars = Array.from({ length: 360 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() < 0.08 ? 2 : 1,
    phase: Math.random() * TAU,
    speed: 0.4 + Math.random(),
  }));

  let particles = [];

  const resize = (width, height) => {
    w = width;
    h = height;
    cx = w * (w > 900 ? 0.6 : 0.5);
    cy = h * 0.47;
    R = Math.max(30, Math.min(w, h) * 0.105);
    const count = Math.round(Math.min(1400, Math.max(400, (w * h) / 1100)));
    particles = Array.from({ length: count }, () => ({
      u: Math.random() ** 1.6, // denser near the inner edge
      a: Math.random() * TAU,
      width: 0.6 + Math.random() * 1.4,
      jitter: (Math.random() - 0.5) * 0.12,
    }));
  };

  const rin = () => R * 1.5;
  const rout = () => R * 4.6;

  // Smooth disk band, drawn in a vertically squashed space; `side` -1 = far half, 1 = near half.
  const band = (side) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, side < 0 ? 0 : cy, w, side < 0 ? cy : h - cy);
    ctx.clip();
    ctx.translate(cx, cy);
    ctx.scale(1, TILT);
    const g = ctx.createRadialGradient(0, 0, rin() * 0.95, 0, 0, rout());
    g.addColorStop(0, rgba(hot, 0));
    g.addColorStop(0.04, rgba(hot, 0.95));
    g.addColorStop(0.2, rgba(warm, 0.6));
    g.addColorStop(0.55, rgba(palette.fg, 0.22));
    g.addColorStop(1, rgba(palette.fg, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rout(), 0, TAU);
    ctx.arc(0, 0, rin() * 0.95, 0, TAU, true);
    ctx.fill();
    ctx.restore();
  };

  const streaks = (dt, front) => {
    const r0 = rin();
    const r1 = rout();
    for (const p of particles) {
      const r = r0 + (r1 - r0) * p.u;
      const speed = 0.0009 * (r0 / r) ** 1.5;
      if (front) p.a += dt * speed; // advance once per frame
      const sin = Math.sin(p.a);
      if (front !== sin > 0) continue;
      const heat = 1 - p.u;
      const color = heat > 0.6 ? mix(warm, hot, (heat - 0.6) / 0.4) : mix(palette.fg, warm, heat / 0.6);
      const beam = 0.55 + 0.45 * Math.cos(p.a); // Doppler beaming: approaching side brighter
      const trail = 0.05 + speed * 160;
      const yOff = p.jitter * R * 0.6;
      ctx.strokeStyle = rgba(color, (0.15 + heat * 0.7) * beam);
      ctx.lineWidth = p.width;
      ctx.beginPath();
      ctx.moveTo(cx + r * Math.cos(p.a - trail), cy + r * Math.sin(p.a - trail) * TILT + yOff);
      ctx.lineTo(cx + r * Math.cos(p.a), cy + r * sin * TILT + yOff);
      ctx.stroke();
    }
  };

  const frame = (t, dt) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = rgba(palette.bg);
    ctx.fillRect(0, 0, w, h);

    // Starfield, pushed outward near the hole (gravitational lensing).
    const drift = t * 0.000004;
    for (const s of stars) {
      let x = ((s.x + drift * s.speed) % 1) * w;
      let y = s.y * h;
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.hypot(dx, dy) || 1;
      if (d < R * 1.2) continue;
      const push = (R * R * 2.6) / d;
      x += (dx / d) * push;
      y += (dy / d) * push;
      ctx.fillStyle = rgba(mix(palette.fg, WHITE, 0.6), 0.35 + 0.35 * Math.sin(t * 0.0015 * s.speed + s.phase));
      ctx.fillRect(x, y, s.size, s.size);
    }

    ctx.globalCompositeOperation = 'lighter';

    // Ambient glow
    const glow = ctx.createRadialGradient(cx, cy, R, cx, cy, R * 8);
    glow.addColorStop(0, rgba(palette.fg, 0.35));
    glow.addColorStop(0.35, rgba(palette.fg, 0.1));
    glow.addColorStop(1, rgba(palette.fg, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    band(-1);
    streaks(dt, false);

    // Lensed halo: the far side of the disk bent over and under the horizon.
    const pulse = 1 + 0.04 * Math.sin(t * 0.0012);
    const halo = ctx.createRadialGradient(cx, cy, R * 0.98, cx, cy, R * 2.1 * pulse);
    halo.addColorStop(0, rgba(hot, 0.95));
    halo.addColorStop(0.12, rgba(warm, 0.55));
    halo.addColorStop(0.4, rgba(palette.fg, 0.16));
    halo.addColorStop(1, rgba(palette.fg, 0));
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 2.1 * pulse, 0, TAU);
    ctx.fill();

    // Event horizon
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fill();

    // Photon ring
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = rgba(hot);
    ctx.shadowBlur = R * 0.35;
    ctx.strokeStyle = rgba(hot, 0.9);
    ctx.lineWidth = Math.max(1.5, R * 0.035);
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.02, 0, TAU);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Near half of the disk crosses in front of the horizon.
    band(1);
    streaks(dt, true);

    ctx.globalCompositeOperation = 'source-over';
  };

  return { resize, frame };
}
