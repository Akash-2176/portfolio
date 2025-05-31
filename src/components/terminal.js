import React, { useState, useRef, useEffect } from 'react';
import CommandHandler, { getCurrentPath } from './CommandHandler';
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
      const message = `System initialized. Welcome to My Terminal.\nType '--help' to see available commands.`;
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

  // Keyboard Input Handling (Custom Typing)
  const handleKeyDown = (e) => {
    if (isTyping) return;

    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === 'ArrowUp') {
      const newIndex = cmdIndex < cmdHistory.length - 1 ? cmdIndex + 1 : cmdIndex;
      setCmdIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      const newIndex = cmdIndex > 0 ? cmdIndex - 1 : -1;
      setCmdIndex(newIndex);
      setInput(newIndex >= 0 ? cmdHistory[cmdHistory.length - 1 - newIndex] : '');
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
            <div
              style={styles.inputLine}
              tabIndex={0}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            >
              <span style={styles.prompt}>Ak2176/Root{getCurrentPath()} $ </span>
              <span>{input}</span>
              {!isTyping && <span style={blockCursorStyle} />}
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
  },
  prompt: {
    marginRight: '10px',
  },
  inputLine: {
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
  },
};

export default Terminal;
