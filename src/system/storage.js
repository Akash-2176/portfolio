// Storage can be unavailable (private mode, blocked site data) — never let it break the UI.
export const load = (store, key, fallback) => {
  try {
    const raw = store.getItem(`acli.${key}`);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const save = (store, key, value) => {
  try {
    store.setItem(`acli.${key}`, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

export const local = typeof window !== 'undefined' ? window.localStorage : null;
export const session = typeof window !== 'undefined' ? window.sessionStorage : null;
