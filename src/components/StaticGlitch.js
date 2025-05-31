import React, { useEffect } from 'react';
import './styles/crt.css';

const StaticGlitch = ({ onFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(onFinish, 800); // 0.8s of static
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return <div className="crt-static"></div>;
};

export default StaticGlitch;
