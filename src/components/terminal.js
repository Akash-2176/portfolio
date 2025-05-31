import React, { useState, useRef, useEffect } from 'react';
import CommandHandler, { getCurrentPath } from './CommandHandler';
import simulateTyping from '../utils/SimulateTyping';
import BootLoader from './BootLoader';

const Terminal = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);

  const bottomRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const historyEl = historyRef.current;
    if (!historyEl) return;

    const shouldScroll =
      historyEl.scrollTop + historyEl.clientHeight >= historyEl.scrollHeight - 100;

    if (shouldScroll) {
      historyEl.scrollTop = historyEl.scrollHeight;
    }
  }, [history]);

  const handleCommand = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const currentPrompt = `Ak2176/Brain${getCurrentPath()} > ${trimmed}`;
    setHistory((prev) => [...prev, currentPrompt]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);
    setInput('');
    setIsTyping(true);

    const result = await CommandHandler(trimmed);

    if (result === '__CLEAR__') {
      setHistory([]);
    } else {
      const output = await simulateTyping(result);
      setHistory((prev) => [...prev, output]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      const newIndex = cmdIndex < cmdHistory.length - 1 ? cmdIndex + 1 : cmdIndex;
      setCmdIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      const newIndex = cmdIndex > 0 ? cmdIndex - 1 : -1;
      setCmdIndex(newIndex);
      setInput(newIndex >= 0 ? cmdHistory[cmdHistory.length - 1 - newIndex] : '');
    }
  };

  return (
    <div style={styles.container}>
      {!bootComplete && <BootLoader onFinish={() => setBootComplete(true)} />}

      {bootComplete && (
        <div ref={historyRef} style={styles.history}>
          {history.map((line, index) => (
            <div key={index} style={styles.line}>{line}</div>
          ))}

          <div style={styles.inputLine}>
            <span style={styles.prompt}>Ak2176/Brain{getCurrentPath()} $</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0000',
    color: '#00ff00',
    height: '100vh',
    fontFamily: 'monospace',
    padding: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
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
  },
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: '1em',
    flex: 1,
  },
};

export default Terminal;
