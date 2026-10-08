import { mix, rgba } from './colors';

const TAU = Math.PI * 2;
const WHITE = [255, 255, 255];
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Fractal ridgeline via midpoint displacement; returns n+1 heights in 0..1.
const ridge = (n, roughness) => {
  const a = new Float32Array(n + 1);
  a[0] = Math.random();
  a[n] = Math.random();
  for (let step = n, amp = 1; step > 1; step /= 2, amp *= roughness) {
    for (let i = step / 2; i < n; i += step) a[i] = (a[i - step / 2] + a[i + step / 2]) / 2 + (Math.random() - 0.5) * amp;
  }
  let lo = Infinity;
  let hi = -Infinity;
  a.forEach((v) => {
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  });
  return a.map((v) => (v - lo) / (hi - lo || 1));
};

/**
 * Synthwave horizon: banded sun with bloom, layered fractal mountains with rim light,
 * horizon fog, a reflective floor and a glowing perspective grid rolling toward the viewer.
 */
export function synthwave(ctx, palette) {
  let w = 0;
  let h = 0;
  let horizon = 0;
  let vx = 0;
  let sr = 0;
  let sy = 0;
  let layers = [];
  const shooting = [];
  const stars = Array.from({ length: 220 }, () => ({ x: Math.random(), y: Math.random() ** 1.6, p: Math.random() * TAU, s: Math.random() }));

  const hot = mix(palette.accent, WHITE, 0.35);

  const resize = (width, height) => {
    w = width;
    h = height;
    horizon = Math.round(h * 0.62);
    vx = w * (w > 900 ? 0.6 : 0.5);
    sr = Math.min(w, h) * 0.22;
    sy = horizon - sr * 0.5;
    // far → near; a valley around the sun keeps it visible
    layers = [
      { height: 0.2, rough: 0.55, tint: 0.2 },
      { height: 0.14, rough: 0.6, tint: 0.1 },
      { height: 0.08, rough: 0.65, tint: 0.03 },
    ].map((l) => {
      const n = 256;
      const hs = ridge(n, l.rough);
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * w;
        const valley = 0.25 + 0.75 * smooth(0, w * 0.28, Math.abs(x - vx));
        pts.push([x, horizon - hs[i] * h * l.height * valley]);
      }
      return { ...l, pts };
    });
  };

  const drawSky = (t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, rgba(palette.bg));
    sky.addColorStop(0.55, rgba(mix(palette.bg, palette.fg, 0.08)));
    sky.addColorStop(1, rgba(mix(palette.bg, palette.accent, 0.3)));
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon);

    for (const s of stars) {
      const y = s.y * horizon * 0.85;
      const fade = 1 - y / (horizon * 0.85);
      ctx.fillStyle = rgba(mix(palette.fg, WHITE, 0.6), (0.2 + 0.5 * Math.abs(Math.sin(t * 0.0008 + s.p))) * fade);
      ctx.fillRect(s.x * w, y, s.s > 0.92 ? 2 : 1, s.s > 0.92 ? 2 : 1);
    }

    // Occasional shooting star
    if (Math.random() < 0.004 && shooting.length < 2) {
      shooting.push({ x: Math.random() * w, y: Math.random() * horizon * 0.4, life: 1 });
    }
    for (let i = shooting.length - 1; i >= 0; i--) {
      const s = shooting[i];
      const g = ctx.createLinearGradient(s.x, s.y, s.x - 90, s.y - 30);
      g.addColorStop(0, rgba(WHITE, 0.8 * s.life));
      g.addColorStop(1, rgba(palette.fg, 0));
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - 90, s.y - 30);
      ctx.stroke();
      s.x += 9;
      s.y += 3;
      s.life -= 0.025;
      if (s.life <= 0) shooting.splice(i, 1);
    }
  };

  const drawSun = (t) => {
    ctx.globalCompositeOperation = 'lighter';
    for (const [r0, r1, a] of [[sr * 0.9, sr * 2.2, 0.35], [sr, sr * 4.5, 0.12]]) {
      const halo = ctx.createRadialGradient(vx, sy, r0, vx, sy, r1);
      halo.addColorStop(0, rgba(palette.accent, a));
      halo.addColorStop(1, rgba(palette.accent, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, horizon);
    }
    ctx.globalCompositeOperation = 'source-over';

    // Disc clipped to bands: gaps grow toward the bottom and drift downward.
    ctx.save();
    ctx.beginPath();
    ctx.arc(vx, sy, sr, 0, TAU);
    ctx.clip();
    ctx.beginPath();
    const top = sy - sr;
    const split = sy - sr * 0.3;
    ctx.rect(vx - sr, top, sr * 2, split - top);
    const period = sr * 0.18;
    const offset = (t * 0.01) % period;
    for (let y = split - period + offset; y < sy + sr; y += period) {
      const k = Math.max(0, (y - split) / (sr * 1.15));
      const gap = period * (0.2 + k * 0.6);
      const start = Math.max(split, y);
      ctx.rect(vx - sr, start, sr * 2, Math.max(0, y + period - gap - start));
    }
    ctx.clip();
    const sun = ctx.createLinearGradient(0, top, 0, sy + sr);
    sun.addColorStop(0, rgba(mix(hot, WHITE, 0.4)));
    sun.addColorStop(0.45, rgba(palette.accent));
    sun.addColorStop(1, rgba(mix(palette.fg, palette.accent, 0.3)));
    ctx.fillStyle = sun;
    ctx.fillRect(vx - sr, top, sr * 2, sr * 2);
    ctx.restore();
  };

  const drawMountains = () => {
    layers.forEach((l, i) => {
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      l.pts.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.lineTo(w, horizon);
      ctx.closePath();
      // Atmospheric perspective: far ridges are lighter and hazier.
      const body = ctx.createLinearGradient(0, horizon - h * l.height, 0, horizon);
      body.addColorStop(0, rgba(mix(palette.bg, palette.accent, l.tint)));
      body.addColorStop(1, rgba(mix(palette.bg, palette.fg, l.tint * 0.6)));
      ctx.fillStyle = body;
      ctx.fill();

      // Rim light from the sun along the ridge.
      const c = vx / w;
      const rim = ctx.createLinearGradient(0, 0, w, 0);
      rim.addColorStop(0, rgba(palette.fg, 0.08));
      rim.addColorStop(Math.max(0, c - 0.25), rgba(palette.fg, 0.3));
      rim.addColorStop(c, rgba(hot, 0.95 - i * 0.2));
      rim.addColorStop(Math.min(1, c + 0.25), rgba(palette.fg, 0.3));
      rim.addColorStop(1, rgba(palette.fg, 0.08));
      ctx.strokeStyle = rim;
      ctx.lineWidth = i === 2 ? 1.5 : 1;
      ctx.beginPath();
      l.pts.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    });

    // Horizon fog
    ctx.globalCompositeOperation = 'lighter';
    const fog = ctx.createLinearGradient(0, horizon - h * 0.07, 0, horizon + h * 0.06);
    fog.addColorStop(0, rgba(palette.accent, 0));
    fog.addColorStop(0.6, rgba(palette.accent, 0.16));
    fog.addColorStop(1, rgba(palette.accent, 0));
    ctx.fillStyle = fog;
    ctx.fillRect(0, horizon - h * 0.07, w, h * 0.13);
    ctx.globalCompositeOperation = 'source-over';
  };

  const drawFloor = (t) => {
    const depth = h - horizon;
    const floor = ctx.createLinearGradient(0, horizon, 0, h);
    floor.addColorStop(0, rgba(mix(palette.bg, palette.accent, 0.18)));
    floor.addColorStop(0.3, rgba(mix(palette.bg, palette.fg, 0.05)));
    floor.addColorStop(1, rgba(palette.bg));
    ctx.fillStyle = floor;
    ctx.fillRect(0, horizon, w, depth);

    // Sun reflection streak
    ctx.globalCompositeOperation = 'lighter';
    ctx.save();
    ctx.translate(vx, horizon);
    ctx.scale(0.45, 1.4);
    const refl = ctx.createRadialGradient(0, 0, 0, 0, 0, sr * 1.2);
    refl.addColorStop(0, rgba(palette.accent, 0.35));
    refl.addColorStop(1, rgba(palette.accent, 0));
    ctx.fillStyle = refl;
    ctx.fillRect(-sr * 1.3, 0, sr * 2.6, sr * 1.3);
    ctx.restore();

    // Grid: wide faint pass for glow, then a crisp pass. Fades into the distance.
    const fade = ctx.createLinearGradient(0, horizon, 0, h);
    fade.addColorStop(0, rgba(palette.fg, 0));
    fade.addColorStop(0.25, rgba(palette.fg, 0.45));
    fade.addColorStop(1, rgba(palette.fg, 0.9));
    const rows = 22;
    const roll = (t * 0.0004) % 1;
    for (const [width, alpha] of [[4, 0.18], [1.2, 1]]) {
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.strokeStyle = fade;
      ctx.beginPath();
      for (let i = -30; i <= 30; i++) {
        ctx.moveTo(vx + i * (w / 70), horizon);
        ctx.lineTo(vx + i * (w / 7.5), h);
      }
      for (let k = 0; k < rows; k++) {
        const y = horizon + depth * ((k + roll) / rows) ** 2.6;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Bright horizon line
    ctx.shadowColor = rgba(palette.accent);
    ctx.shadowBlur = 18;
    ctx.strokeStyle = rgba(hot, 0.9);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w, horizon);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
  };

  const frame = (t) => {
    drawSky(t);
    drawSun(t);
    drawMountains();
    drawFloor(t);
  };

  return { resize, frame };
}
