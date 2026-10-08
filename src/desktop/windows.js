import { getApp } from '../apps/meta';

// Window manager state. One window per app; `z` orders stacking.
export const initialWindows = { windows: [], z: 1 };

const TOP_BAR = 32;
const TASKBAR = 40;

const clampSize = ([w, h], vw, vh) => [Math.min(w, vw - 40), Math.min(h, vh - TOP_BAR - TASKBAR - 40)];

export function windowsReducer(state, action) {
  const { windows, z } = state;
  const update = (appId, patch) => windows.map((w) => (w.appId === appId ? { ...w, ...patch } : w));

  switch (action.type) {
    case 'open': {
      const existing = windows.find((w) => w.appId === action.appId);
      if (existing) {
        return { z: z + 1, windows: update(action.appId, { z: z + 1, minimized: false, props: action.props ?? existing.props }) };
      }
      if (action.rect) {
        const { x, y, w, h } = action.rect;
        return {
          z: z + 1,
          windows: [...windows, { appId: action.appId, x, y, w, h, z: z + 1, minimized: false, maximized: false, props: action.props }],
        };
      }
      const { vw, vh } = action.viewport;
      const [w, h] = clampSize(getApp(action.appId).size, vw, vh);
      const n = windows.length;
      const areaH = vh - TOP_BAR - TASKBAR;
      const x = Math.max(16, Math.round((vw - w) / 2 + (n ? n * 28 - 60 : 40)));
      const y = Math.max(8, Math.round((areaH - h) / 2 + (n ? n * 24 - 40 : 0)));
      return {
        z: z + 1,
        windows: [...windows, { appId: action.appId, x, y, w, h, z: z + 1, minimized: false, maximized: false, props: action.props }],
      };
    }
    case 'close':
      return { ...state, windows: windows.filter((w) => w.appId !== action.appId) };
    case 'focus':
      return { z: z + 1, windows: update(action.appId, { z: z + 1, minimized: false }) };
    case 'minimize':
      return { ...state, windows: update(action.appId, { minimized: true }) };
    case 'toggleMax': {
      const win = windows.find((w) => w.appId === action.appId);
      return { z: z + 1, windows: update(action.appId, { maximized: !win.maximized, z: z + 1 }) };
    }
    case 'move':
      return { ...state, windows: update(action.appId, { x: action.x, y: action.y }) };
    case 'resize':
      return { ...state, windows: update(action.appId, { w: action.w, h: action.h }) };
    default:
      return state;
  }
}

export const focusedWindow = (windows) =>
  windows.filter((w) => !w.minimized).reduce((top, w) => (!top || w.z > top.z ? w : top), null);
