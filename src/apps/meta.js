// App metadata shared by the desktop, handheld and terminal (`ls`, `open`).
// `file` is the label shown under desktop icons; `size` is the default window size.
export const APPS = [
  { id: 'terminal', title: 'Terminal', file: 'Terminal', glyph: '>_', size: [720, 460] },
  { id: 'about', title: 'whoami.txt', file: 'whoami.txt', glyph: '◉', size: [560, 480] },
  { id: 'projects', title: 'Projects', file: 'Projects/', glyph: '▤', size: [760, 500] },
  { id: 'experience', title: 'Work.log', file: 'Work.log', glyph: '⚒', size: [600, 480] },
  { id: 'skills', title: 'Skills.cfg', file: 'Skills.cfg', glyph: '★', size: [560, 460] },
  { id: 'resume', title: 'Resume.pdf', file: 'Resume.pdf', glyph: '▧', size: [520, 420] },
  { id: 'contact', title: 'Mail', file: 'Mail', glyph: '✉', size: [480, 380] },
  { id: 'settings', title: 'Settings', file: 'Settings', glyph: '⚙', size: [460, 440] },
];

export const getApp = (id) => APPS.find((a) => a.id === id);

// Accept ids, titles and file names: `open work.log`, `open projects/`
export const findApp = (query) => {
  const q = String(query || '').toLowerCase().replace(/\/$/, '');
  return APPS.find(
    (a) => a.id === q || a.title.toLowerCase().replace(/\/$/, '') === q || a.file.toLowerCase().replace(/\/$/, '') === q,
  );
};
