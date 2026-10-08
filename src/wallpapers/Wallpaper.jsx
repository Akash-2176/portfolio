import { useEffect, useRef } from 'react';
import { useSettings } from '../system/settings';
import { useReducedMotion } from '../system/hooks';
import { readPalette } from './colors';
import { blackhole } from './blackhole';
import { blackholeGL } from './blackholeGL';
import { synthwave } from './synthwave';
import './wallpaper.css';

// Adapts a 2D-canvas scene ({ resize(w, h), frame(t, dt) }) to the common scene shape.
const with2d = (factory) => (canvas, palette) => {
  const ctx = canvas.getContext('2d');
  const scene = factory(ctx, palette);
  return {
    resize(w, h, dpr) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.resize(w, h);
    },
    frame: scene.frame,
  };
};

// Scenes: { resize(w, h, dpr), frame(t, dt), fps?, destroy? }
const SCENES = {
  blackhole: (canvas, palette) => blackholeGL(canvas, palette) ?? with2d(blackhole)(canvas, palette),
  synthwave: with2d(synthwave),
};

/** Animated desktop background. Grid is pure CSS; the others draw on a canvas. */
export default function Wallpaper() {
  const { wallpaper, theme } = useSettings();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const createScene = SCENES[wallpaper];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !createScene) return undefined;
    const scene = createScene(canvas, readPalette());
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const minFrame = scene.fps ? 1000 / scene.fps : 0;
    let raf = 0;
    let last = performance.now();

    const fit = () => {
      scene.resize(canvas.clientWidth, canvas.clientHeight, dpr);
      if (reducedMotion) scene.frame(20000, 0);
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < minFrame) return;
      scene.frame(now, Math.min(now - last, 100));
      last = now;
    };

    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    fit();
    if (!reducedMotion) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.destroy?.();
    };
  }, [createScene, theme, reducedMotion]);

  if (!createScene) return <div className="wallpaper phosphor-grid" aria-hidden="true" />;
  // Keyed so switching between WebGL and 2D scenes gets a fresh canvas.
  return <canvas key={wallpaper} ref={canvasRef} className="wallpaper" aria-hidden="true" />;
}
