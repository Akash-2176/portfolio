import React, { useState, useEffect } from 'react';
import BootLoader from './BootLoader';
import Terminal from './terminal';
import StaticGlitch from './StaticGlitch';
import './styles/crt.css';

const CRTMonitor = () => {
  const [bootDone, setBootDone] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showBootLoader, setShowBootLoader] = useState(false);

  // Start the boot loader 500ms after initial render (after flicker appears)
  useEffect(() => {
    const timer = setTimeout(() => setShowBootLoader(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="crt-wrapper">
      <div className="crt-screen">
        {/* Flicker effect always visible */}
        <div className="crt-flicker"></div>

        {/* Vignette glassy bloom */}
        <div className="crt-vignette"></div>

        {/* Render main content with delay */}
        {bootDone ? (
          showGlitch ? (
            <StaticGlitch onFinish={() => setShowGlitch(false)} />
          ) : (
            <Terminal bootDone={bootDone} />
          )
        ) : showBootLoader ? (
          <BootLoader
            onFinish={() => {
              setBootDone(true);
              setShowGlitch(true);
            }}
          />
        ) : null /* Nothing rendered before 500ms */}
      </div>
    </div>
  );
};

export default CRTMonitor;
