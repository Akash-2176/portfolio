// Read the active phosphor palette from CSS variables as RGB triples.
const parse = (value) => {
  const v = value.trim();
  if (v.startsWith('#')) {
    const hex = v.length === 4 ? v.slice(1).replace(/./g, (c) => c + c) : v.slice(1, 7);
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = v.match(/\d+(\.\d+)?/g);
  return m ? m.slice(0, 3).map(Number) : [255, 255, 255];
};

export const readPalette = () => {
  const css = getComputedStyle(document.documentElement);
  const get = (name) => parse(css.getPropertyValue(name) || '#ffffff');
  return { bg: get('--bg'), fg: get('--fg'), dim: get('--dim'), accent: get('--accent') };
};

export const rgba = ([r, g, b], a = 1) => `rgba(${r},${g},${b},${a})`;

// Blend two colors: t=0 → a, t=1 → b
export const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
