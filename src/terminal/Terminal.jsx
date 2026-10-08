import { useCallback, useEffect, useRef, useState } from 'react';
import { Blocks, RunProvider } from '../blocks/Blocks';
import { applySuggestion, runCommand, suggest } from '../commands/registry';
import { welcomeBlocks } from '../content/views';
import { play } from '../system/sound';
import { useSettings } from '../system/settings';
import './terminal.css';

const PROMPT = 'ak@acli:~$';
const CHIPS = ['help', 'whoami', 'projects', 'experience', 'skills', 'contact', 'theme', 'clear'];

let nextId = 1;
const entry = (line, blocks) => ({ id: nextId++, line, blocks });

/**
 * Shell UI. `system` supplies OS-level actions: { openApp, closeSelf?, reboot }.
 * `focused` tells the desktop terminal when its window is active.
 */
export default function Terminal({ system, variant = 'desktop', focused = true }) {
  const settings = useSettings();
  const [entries, setEntries] = useState(() => [entry(null, welcomeBlocks())]);
  const [input, setInput] = useState('');
  const [caret, setCaret] = useState(0);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [sugIdx, setSugIdx] = useState(-1);
  const [showSug, setShowSug] = useState(false);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  const suggestions = showSug ? suggest(input) : [];

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  useEffect(() => {
    if (focused && variant === 'desktop') focusInput();
  }, [focused, variant]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const execute = useCallback(
    (line) => {
      const trimmed = line.trim();
      play('enter');
      if (!trimmed) {
        setEntries((prev) => [...prev, entry('', [])]);
        return;
      }
      const nextHistory = [...history, trimmed];
      setHistory(nextHistory);
      setHistIdx(-1);

      let cleared = false;
      const blocks = runCommand(trimmed, {
        ...system,
        ...settings,
        history: nextHistory,
        device: variant,
        clear: () => {
          cleared = true;
        },
      });
      if (cleared) {
        setEntries([]);
        return;
      }
      if (blocks[0]?.tone === 'error') play('error');
      setEntries((prev) => [...prev, entry(trimmed, blocks)]);
    },
    [history, settings, system, variant],
  );

  const setLine = (value) => {
    setInput(value);
    setCaret(value.length);
    setSugIdx(-1);
  };

  const run = useCallback(
    (cmd) => {
      execute(cmd);
      setLine('');
      setShowSug(false);
      focusInput();
    },
    [execute],
  );

  const onKeyDown = (e) => {
    const key = e.key;
    if (e.ctrlKey && (key === 'l' || key === 'L')) {
      e.preventDefault();
      setEntries([]);
      return;
    }
    if (e.ctrlKey && (key === 'c' || key === 'C') && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) {
      e.preventDefault();
      setEntries((prev) => [...prev, entry(`${input}^C`, [])]);
      setLine('');
      setShowSug(false);
      return;
    }
    switch (key) {
      case 'Enter':
        e.preventDefault();
        if (sugIdx >= 0 && suggestions[sugIdx]) {
          setLine(applySuggestion(input, suggestions[sugIdx]));
          setShowSug(false);
          return;
        }
        run(input);
        return;
      case 'Tab': {
        e.preventDefault();
        const list = suggest(input);
        if (list.length === 1) {
          setLine(applySuggestion(input, list[0]));
          setShowSug(false);
        } else if (list.length > 1) {
          setShowSug(true);
          const step = e.shiftKey ? -1 : 1;
          setSugIdx((i) => (i + step + list.length) % list.length);
          play('click');
        }
        return;
      }
      case 'Escape':
        setShowSug(false);
        setSugIdx(-1);
        return;
      case 'ArrowUp':
      case 'ArrowDown': {
        if (!history.length) return;
        e.preventDefault();
        const idx =
          key === 'ArrowUp' ? Math.min(histIdx + 1, history.length - 1) : Math.max(histIdx - 1, -1);
        setHistIdx(idx);
        setLine(idx === -1 ? '' : history[history.length - 1 - idx]);
        setShowSug(false);
        return;
      }
      default:
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
    setCaret(e.target.selectionStart ?? e.target.value.length);
    setSugIdx(-1);
    setShowSug(e.target.value.trim().length > 0);
    play('key');
  };

  const syncCaret = (e) => setCaret(e.target.selectionStart ?? input.length);

  // Clicking empty space focuses the prompt, but don't steal text selections or link clicks.
  const onBodyClick = (e) => {
    if (e.target.closest('a, button, input')) return;
    if (window.getSelection()?.toString()) return;
    focusInput();
  };

  return (
    <RunProvider value={run}>
      <div className={`term term-${variant}`} onClick={onBodyClick}>
        <div className="term-log" ref={logRef} aria-live="polite">
          {entries.map((ent) => (
            <div key={ent.id} className="term-entry">
              {ent.line !== null && (
                <div className="term-line">
                  <span className="term-prompt">{PROMPT}</span> {ent.line}
                </div>
              )}
              {ent.blocks.length > 0 && <Blocks blocks={ent.blocks} reveal />}
            </div>
          ))}

          <label className="term-input-line">
            <span className="term-prompt">{PROMPT}</span>
            <span className="term-field">
              <span className="term-mirror" aria-hidden="true">
                {input.slice(0, caret)}
                <span className={`term-cursor${focused ? '' : ' idle'}`}>{input[caret] || ' '}</span>
                {input.slice(caret + 1)}
              </span>
              <input
                ref={inputRef}
                className="term-input"
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onKeyUp={syncCaret}
                onClick={syncCaret}
                onSelect={syncCaret}
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
              />
            </span>
          </label>

          {suggestions.length > 0 && (
            <div className="term-suggestions" role="listbox" aria-label="Completions">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  role="option"
                  aria-selected={i === sugIdx}
                  className={i === sugIdx ? 'active' : ''}
                  onClick={() => {
                    setLine(applySuggestion(input, s));
                    setShowSug(false);
                    focusInput();
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {variant === 'mobile' && (
          <div className="term-chips" aria-label="Quick commands">
            {CHIPS.map((c) => (
              <button key={c} type="button" onClick={() => run(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </RunProvider>
  );
}
