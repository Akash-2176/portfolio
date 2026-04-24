import React, { useState, useRef, useEffect } from 'react';
import CommandHandler, { getCurrentPath, getCommandSuggestions } from './CommandHandler';
import simulateTyping from '../utils/SimulateTyping';
import BootLoader from './BootLoader';

const Terminal = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showStartupMsg, setShowStartupMsg] = useState(false);
  const [startupMsgDone, setStartupMsgDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  const historyRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const blockCursorStyle = {
    display: 'inline-block',
    backgroundColor: '#00ff00',
    width: '0.6ch',
    height: '1.2em',
    marginLeft: '1px',
    animation: 'blink 1s step-end infinite',
  };

  // Smooth scroll if user is at bottom
  useEffect(() => {
    const el = historyRef.current;
    if (!el) return;

    const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
    if (isNearBottom) el.scrollTop = el.scrollHeight;
  }, [history]);

  // Focus input line when ready
  useEffect(() => {
    if (startupMsgDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [startupMsgDone]);

  // Startup Message Typing
  useEffect(() => {
    if (showStartupMsg) {
      const message = `╔════════════════════════════════════════════════════════════╗
║    🚀 Welcome to Akash's Interactive Terminal Portfolio    ║
║                                                            ║
║       This is my Knowledge Garden (KG) — a living         ║
║       document of who I am, what I've built, and          ║
║       what I'm passionate about.                          ║
║                                                            ║
║  Pro Tip: Start with 'whoami' or 'help' for more info!    ║
╚════════════════════════════════════════════════════════════╝`;
      setIsTyping(true);
      setHistory((prev) => [...prev, '']);
      const lineIndex = history.length;

      simulateTyping(message, (partialText) => {
        setHistory((prev) => {
          const updated = [...prev];
          updated[lineIndex] = partialText;
          return updated;
        });
      }).then(() => {
        setIsTyping(false);
        setStartupMsgDone(true);
        setShowStartupMsg(false);
      });
    }
  }, [showStartupMsg]);

  // Command Handling
  const handleCommand = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const prompt = `Ak2176/Root${getCurrentPath()} > ${trimmed}`;
    setHistory((prev) => [...prev, prompt]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);
    setInput('');
    setIsTyping(true);

    const result = await CommandHandler(trimmed);

    if (result === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, '']);
      const outputIndex = history.length + 1;

      await simulateTyping(result, (partialText) => {
        setHistory((prev) => {
          const updated = [...prev];
          updated[outputIndex] = partialText;
          return updated;
        });
      });
    }

    setIsTyping(false);
  };

  // Update suggestions when input changes
  useEffect(() => {
    const trimmed = input.trim().toLowerCase();
    const prefix = trimmed.split(' ')[0];
    
    if (prefix.length > 0) {
      const matched = getCommandSuggestions(prefix);
      setSuggestions(matched);
      setSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setSuggestionIndex(-1);
    }
  }, [input]);

  // Keyboard Input Handling (Enhanced with autocomplete)
  const handleKeyDown = (e) => {
    if (isTyping) return;

    if (e.key === 'Enter') {
      handleCommand();
      setSuggestions([]);
      setSuggestionIndex(-1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Accept current suggestion
      if (suggestions.length > 0) {
        const suggestion = suggestions[suggestionIndex >= 0 ? suggestionIndex : 0];
        const parts = input.trim().split(' ');
        parts[0] = suggestion;
        setInput(parts.join(' ') + ' ');
        setSuggestions([]);
        setSuggestionIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        e.preventDefault();
        setSuggestionIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else {
        const newIndex = cmdIndex < cmdHistory.length - 1 ? cmdIndex + 1 : cmdIndex;
        setCmdIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (suggestions.length > 0) {
        e.preventDefault();
        setSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else {
        const newIndex = cmdIndex > 0 ? cmdIndex - 1 : -1;
        setCmdIndex(newIndex);
        setInput(newIndex >= 0 ? cmdHistory[cmdHistory.length - 1 - newIndex] : '');
      }
    } else if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setInput((prev) => prev + e.key);
    }
  };

  return (
    <div style={styles.container}>
      {!bootComplete && (
        <BootLoader
          onFinish={() => {
            setBootComplete(true);
            setShowStartupMsg(true);
          }}
        />
      )}

      {bootComplete && (
        <div ref={historyRef} style={styles.history}>
          {history.map((line, i) => (
            <div key={i} style={styles.line}>{line}</div>
          ))}

          {startupMsgDone && (
            <div style={styles.inputSection}>
              {/* Autocomplete suggestions dropdown */}
              {suggestions.length > 0 && (
                <div style={styles.suggestionsBox}>
                  {suggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.suggestionItem,
                        ...(idx === suggestionIndex && styles.suggestionItemActive),
                      }}
                    >
                      <span style={styles.suggestionIcon}>↳</span>
                      {suggestion}
                    </div>
                  ))}
                  <div style={styles.suggestionsHint}>Press TAB to autocomplete, ESC to dismiss</div>
                </div>
              )}

              {/* Command input line */}
              <div
                style={styles.inputLine}
                tabIndex={0}
                ref={inputRef}
                onKeyDown={handleKeyDown}
              >
                <span style={styles.prompt}>Ak2176/Root $ </span>
                <span>{input}</span>
                {!isTyping && <span style={blockCursorStyle} />}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#00ff00',
    height: '100vh',
    fontFamily: 'monospace',
    padding: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'none',
  },
  history: {
    flex: 1,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  line: {
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  inputSection: {
    position: 'relative',
    marginTop: '10px',
  },
  suggestionsBox: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    backgroundColor: '#0a0a0a',
    border: '1px solid #00d9ff',
    borderRadius: '4px',
    maxHeight: '150px',
    overflowY: 'auto',
    marginBottom: '5px',
    minWidth: '200px',
    boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)',
  },
  suggestionItem: {
    padding: '8px 12px',
    color: '#00d9ff',
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    transition: 'all 0.2s ease',
  },
  suggestionItemActive: {
    backgroundColor: '#0d3a4a',
    borderLeftColor: '#00ff00',
    color: '#00ff00',
  },
  suggestionIcon: {
    marginRight: '8px',
    color: '#ff6600',
  },
  suggestionsHint: {
    padding: '6px 12px',
    fontSize: '0.8em',
    color: '#666',
    borderTop: '1px solid #00d9ff',
    fontStyle: 'italic',
  },
  prompt: {
    marginRight: '8px',
    color: '#00ff00',
    fontWeight: 'bold',
  },
  inputLine: {
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    position: 'relative',
  },
};

export default Terminal;
