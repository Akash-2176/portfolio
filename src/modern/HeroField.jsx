import { useEffect, useRef } from 'react';

const VIOLET = [139, 92, 246];
const CYAN = [34, 211, 238];
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/**
 * Interactive constellation: particles link up when close, the pointer is a gravity
 * well they orbit, and clicking sends out a shockwave.
 */
export default function HeroField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let parts = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const waves = [];

    const fit = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(200, Math.max(60, (w * h) / 8000)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 0.8 + Math.random() * 1.8,
      }));
      if (reduced) draw();
    };

    const step = () => {
      for (const p of parts) {
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 240) {
            const f = 1 - d / 240;
            p.vx += (dx / d) * 0.05 * f - (dy / d) * 0.09 * f; // pull + swirl
            p.vy += (dy / d) * 0.05 * f + (dx / d) * 0.09 * f;
          }
        }
        for (const wv of waves) {
          const dx = p.x - wv.x;
          const dy = p.y - wv.y;
          const d = Math.hypot(dx, dy) || 1;
          if (Math.abs(d - wv.r) < 30) {
            p.vx += (dx / d) * 1.2;
            p.vy += (dy / d) * 1.2;
          }
        }
        p.vx = p.vx * 0.975 + (Math.random() - 0.5) * 0.02;
        p.vy = p.vy * 0.975 + (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].r += 9;
        if (waves[i].r > Math.max(w, h)) waves.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const link = 120;
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx > link || dx < -link || dy > link || dy < -link) continue;
          const d = Math.hypot(dx, dy);
          if (d > link) continue;
          const [r, g, bl] = lerp(VIOLET, CYAN, a.x / w);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${(1 - d / link) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const p of parts) {
        const [r, g, b] = lerp(VIOLET, CYAN, p.x / w);
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const wv of waves) {
        ctx.strokeStyle = `rgba(167,139,250,${Math.max(0, 0.5 - wv.r / 1200)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom };
    };
    const onMove = (e) => {
      const p = local(e);
      Object.assign(pointer, p, { active: p.inside });
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e) => {
      if (e.target.closest('a, button')) return;
      const p = local(e);
      if (p.inside) waves.push({ x: p.x, y: p.y, r: 0 });
    };

    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    fit();
    const section = canvas.parentElement;
    if (!reduced) {
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerleave', onLeave);
      section.addEventListener('pointerdown', onDown);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      section.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
