import { useEffect, useRef } from 'react';
import { hasFinePointer } from './hooks';

/** Dot + trailing ring cursor. The ring grows over interactive elements and shows a label from [data-cursor]. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    document.documentElement.classList.add('custom-cursor');
    const pos = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let raf = 0;

    // Re-checked on scroll/click too, since content can move under a still pointer.
    const updateTarget = (el) => {
      if (!ring.current) return;
      const target = el?.closest?.('a, button, [data-cursor]');
      ring.current.classList.toggle('hover', !!target);
      ring.current.dataset.label = target?.dataset.cursor ?? '';
    };
    const recheck = () => requestAnimationFrame(() => updateTarget(document.elementFromPoint(pos.x, pos.y)));
    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      updateTarget(e.target);
    };
    const down = () => ring.current.classList.add('down');
    const up = () => {
      ring.current.classList.remove('down');
      recheck();
    };
    const hide = () => {
      dot.current.style.opacity = '0';
      ring.current.style.opacity = '0';
    };
    const show = () => {
      dot.current.style.opacity = '';
      ring.current.style.opacity = '';
    };

    const loop = () => {
      trail.x += (pos.x - trail.x) * 0.18;
      trail.y += (pos.y - trail.y) * 0.18;
      ring.current.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('scroll', recheck, { passive: true });
    document.addEventListener('pointerleave', hide);
    document.addEventListener('pointerenter', show);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('scroll', recheck);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('pointerenter', show);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
