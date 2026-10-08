import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Boot from './boot/Boot';
import Chooser from './chooser/Chooser';
import { SettingsProvider, useSettings } from './system/settings';
import { useIsDesktop, useReducedMotion } from './system/hooks';
import { load, save, session } from './system/storage';
import { unlockAudio } from './system/sound';

// Code-split so each experience only downloads what it renders.
const loadDesktop = () => import('./desktop/Desktop');
const loadHandheld = () => import('./handheld/Handheld');
const loadModern = () => import('./modern/Modern');
const Desktop = lazy(loadDesktop);
const Handheld = lazy(loadHandheld);
const Modern = lazy(loadModern);

function RetroShell() {
  const { crt } = useSettings();
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [quick, setQuick] = useState(() => load(session, 'booted', false) || reducedMotion);
  const [bootId, setBootId] = useState(0); // bump to remount the OS on reboot

  useEffect(unlockAudio, []);

  // Fetch the right shell while the boot screen plays.
  useEffect(() => {
    (isDesktop ? loadDesktop : loadHandheld)();
  }, [isDesktop]);

  const finishBoot = useCallback(() => {
    save(session, 'booted', true);
    setBooting(false);
  }, []);

  const reboot = useCallback(() => {
    setQuick(false);
    setBooting(true);
    setBootId((n) => n + 1);
  }, []);

  const OS = isDesktop ? Desktop : Handheld;

  return (
    <>
      {booting ? (
        <Boot key={bootId} quick={quick} onDone={finishBoot} />
      ) : (
        <Suspense fallback={null}>
          <OS key={bootId} reboot={reboot} />
        </Suspense>
      )}
      {crt && <div className="crt-overlay" aria-hidden="true" />}
    </>
  );
}

const preload = (style) => (style === 'modern' ? loadModern() : loadDesktop());

function Root() {
  const { style } = useSettings();
  if (style === 'modern') {
    return (
      <Suspense fallback={null}>
        <Modern />
      </Suspense>
    );
  }
  if (style === 'retro') return <RetroShell />;
  return <Chooser preload={preload} />;
}

export default function App() {
  return (
    <SettingsProvider>
      <Root />
    </SettingsProvider>
  );
}
