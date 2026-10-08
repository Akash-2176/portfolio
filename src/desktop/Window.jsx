import { useEffect, useRef } from 'react';
import { getApp } from '../apps/meta';

const MIN_W = 320;
const MIN_H = 200;

// Pointer-drag helper: calls onMove(dx, dy) while dragging.
const useDrag = (onStart, onMove) => {
  const origin = useRef(null);
  return {
    onPointerDown: (e) => {
      if (e.button !== 0 || e.target.closest('button')) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      origin.current = { x: e.clientX, y: e.clientY, start: onStart() };
    },
    onPointerMove: (e) => {
      if (!origin.current) return;
      onMove(e.clientX - origin.current.x, e.clientY - origin.current.y, origin.current.start);
    },
    onPointerUp: () => {
      origin.current = null;
    },
  };
};

export default function Window({ win, focused, bounds, dispatch, onClose, children }) {
  const app = getApp(win.appId);
  const { appId } = win;
  const ref = useRef(null);

  // Keep keyboard focus in the active window (apps like Terminal focus their own input first).
  useEffect(() => {
    const el = ref.current;
    if (focused && el && !el.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [focused]);

  const drag = useDrag(
    () => ({ x: win.x, y: win.y }),
    (dx, dy, start) => {
      if (win.maximized) return;
      const x = Math.min(Math.max(start.x + dx, 60 - win.w), bounds.w - 60);
      const y = Math.min(Math.max(start.y + dy, 0), bounds.h - 30);
      dispatch({ type: 'move', appId, x, y });
    },
  );

  const resize = useDrag(
    () => ({ w: win.w, h: win.h }),
    (dx, dy, start) => {
      const w = Math.min(Math.max(start.w + dx, MIN_W), bounds.w - win.x);
      const h = Math.min(Math.max(start.h + dy, MIN_H), bounds.h - win.y);
      dispatch({ type: 'resize', appId, w, h });
    },
  );

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: '100%', zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <section
      ref={ref}
      tabIndex={-1}
      className={`win${focused ? ' focused' : ''}${win.maximized ? ' maximized' : ''}`}
      style={style}
      hidden={win.minimized}
      role="dialog"
      aria-label={app.title}
      onPointerDownCapture={() => !focused && dispatch({ type: 'focus', appId })}
      onFocusCapture={() => !focused && dispatch({ type: 'focus', appId })}
    >
      <header className="win-title" {...drag} onDoubleClick={() => dispatch({ type: 'toggleMax', appId })}>
        <span className="win-glyph" aria-hidden="true">{app.glyph}</span>
        <span className="win-name">{app.title}</span>
        <span className="win-controls">
          <button type="button" aria-label="Minimize" onClick={() => dispatch({ type: 'minimize', appId })}>
            _
          </button>
          <button type="button" aria-label={win.maximized ? 'Restore' : 'Maximize'} onClick={() => dispatch({ type: 'toggleMax', appId })}>
            {win.maximized ? '❐' : '□'}
          </button>
          <button type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </span>
      </header>
      <div className="win-body">{children}</div>
      {!win.maximized && <div className="win-resize" aria-hidden="true" {...resize} />}
    </section>
  );
}
