import { describe, expect, it } from 'vitest';
import { focusedWindow, initialWindows, windowsReducer } from './windows';

const viewport = { vw: 1440, vh: 900 };
const open = (state, appId) => windowsReducer(state, { type: 'open', appId, viewport });

describe('window manager', () => {
  it('opens one window per app and focuses the newest', () => {
    let s = open(initialWindows, 'terminal');
    s = open(s, 'projects');
    s = open(s, 'terminal');
    expect(s.windows).toHaveLength(2);
    expect(focusedWindow(s.windows).appId).toBe('terminal');
  });

  it('minimized windows lose focus and come back on focus', () => {
    let s = open(open(initialWindows, 'terminal'), 'projects');
    s = windowsReducer(s, { type: 'minimize', appId: 'projects' });
    expect(focusedWindow(s.windows).appId).toBe('terminal');
    s = windowsReducer(s, { type: 'focus', appId: 'projects' });
    expect(focusedWindow(s.windows).appId).toBe('projects');
  });

  it('closes windows', () => {
    const s = windowsReducer(open(initialWindows, 'terminal'), { type: 'close', appId: 'terminal' });
    expect(s.windows).toHaveLength(0);
  });
});
