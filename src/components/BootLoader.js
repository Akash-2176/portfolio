import React, { useEffect, useState } from 'react';

const asciiLogo = [
  "   ___   ____   _      ___ ",
  "  / _ | / _  | / |    / _ |",
  " / _  |/ /_| | | |   / /_| |",
  "/_/ |_|____/ |_|__ /____/ |",
  "                        |__|",
  "      A K   C M D   L I N E",
  "",
  "Booting up ACLI Terminal...",
  "Initializing memory...",
  "Mounting root FS...",
  "Loading CLI modules...",
  "Done. Starting interface...\n",
];

const BootLoader = ({ onFinish }) => {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < asciiLogo.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, asciiLogo[index]]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      const endDelay = setTimeout(onFinish, 800); // Small delay before showing terminal input
      return () => clearTimeout(endDelay);
    }
  }, [index]);

  return (
    <div style={styles.bootContainer}>
      {lines.map((line, idx) => (
        <pre key={idx} style={styles.line}>{line}</pre>
      ))}
    </div>
  );
};

const styles = {
  bootContainer: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: '1em',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'black',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // center vertically
    alignItems: 'center',     // center horizontally
  },
};



export default BootLoader;
