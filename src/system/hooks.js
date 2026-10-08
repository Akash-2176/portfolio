import { useEffect, useState } from 'react';

const useMedia = (query) => {
  const get = () => typeof window !== 'undefined' && window.matchMedia?.(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia?.(query);
    if (!mql) return undefined;
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return !!matches;
};

export const useIsDesktop = () => useMedia('(pointer: fine) and (min-width: 900px)');
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');

export const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};
