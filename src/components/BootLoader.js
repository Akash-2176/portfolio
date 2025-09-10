import React, { useEffect, useState } from 'react';

const asciiLogo = [
  "",
    "  █████╗ ██╗  ██╗ ██████╗██╗     ██╗ ",
    " ██╔══██╗██║ ██╔╝██╔════╝██║     ██║ ",
    " ███████║█████╔╝ ██║     ██║     ██║ ",
    " ██╔══██║██╔═██╗ ██║     ██║     ██║ ",
    " ██║  ██║██║  ██╗╚██████╗███████╗██║ ",
    " ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝ ",
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
        <div key={idx} style={styles.line}>{line}</div>
      ))}
    </div>
  );
};

const styles = {
  bootContainer: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: '3em',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'black',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    lineHeight: '1.5em',
  },
};


export default BootLoader;
