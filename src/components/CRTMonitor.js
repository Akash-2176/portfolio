import React, { useState } from 'react';
import BootLoader from './BootLoader';
import Terminal from './terminal';
import StaticGlitch from './StaticGlitch';
import './styles/crt.css';

const CRTMonitor = () => {
  const [bootDone, setBootDone] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  return (
    <div className="crt-wrapper">
      <div className="crt-screen">
        {bootDone ? (
          showGlitch ? (
            <StaticGlitch onFinish={() => setShowGlitch(false)} />
          ) : (
            <Terminal bootDone={bootDone} />
          )
        ) : (
          <BootLoader onFinish={() => {
            setBootDone(true);
            setShowGlitch(true);
          }} />
        )}
        <div className="crt-vignette"></div>
      </div>
    </div>
  );
};

export default CRTMonitor;
