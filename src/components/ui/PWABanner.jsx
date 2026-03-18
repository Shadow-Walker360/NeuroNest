import React, { useEffect, useState } from 'react';
import './ui.css';

/**
 * PWABanner
 * ─────────
 * Shows a native-looking install prompt when the browser fires
 * `beforeinstallprompt`. This only happens when ALL PWA criteria are met:
 *   ✓ HTTPS (or localhost)
 *   ✓ Valid manifest.json with icons
 *   ✓ Service worker registered (public/sw.js)
 *   ✓ Not already installed
 *   ✓ User has interacted with the page at least once
 *
 * Also shows an iOS-specific banner (Safari doesn't support beforeinstallprompt).
 */

function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream
  );
}

function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export default function PWABanner() {
  const [installPrompt, setInstallPrompt] = useState(null); // deferred event
  const [show, setShow]                   = useState(false);
  const [isIos, setIsIos]                 = useState(false);
  const [installing, setInstalling]       = useState(false);
  const [installed, setInstalled]         = useState(false);

  useEffect(() => {
    // Already installed or running in standalone — never show
    if (isInStandaloneMode()) return;

    // Already dismissed this session
    if (sessionStorage.getItem('lv_pwa_dismissed')) return;

    // iOS Safari — different instructions needed (Add to Home Screen)
    if (isIOS()) {
      setIsIos(true);
      // Show after 8 seconds to not be annoying on first load
      const t = setTimeout(() => setShow(true), 8000);
      return () => clearTimeout(t);
    }

    // Chrome / Edge / Android — capture the deferred prompt
    const handler = (e) => {
      e.preventDefault();         // prevent the browser's default mini-infobar
      setInstallPrompt(e);        // save the event so we can trigger it later
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setShow(false);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    setInstalling(true);
    try {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setShow(false);
      }
    } finally {
      setInstalling(false);
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem('lv_pwa_dismissed', '1');
  };

  if (!show) return null;

  // ── iOS Instructions Banner ──────────────────────────
  if (isIos) {
    return (
      <div className="pwa-banner" role="complementary" aria-label="Install app">
        <div className="pwa-logo">📚</div>
        <div className="pwa-text">
          <h3>Install LearnVerse</h3>
          <p>
            Tap <strong>Share</strong>{' '}
            <span style={{ fontSize: 15 }}>⎙</span> then{' '}
            <strong>"Add to Home Screen"</strong> for the full app experience.
          </p>
        </div>
        <div className="pwa-actions">
          <button className="pwa-dismiss" onClick={handleDismiss}>Got it</button>
        </div>
      </div>
    );
  }

  // ── Chrome / Edge / Android Banner ──────────────────
  return (
    <div className="pwa-banner" role="complementary" aria-label="Install app">
      <div className="pwa-logo">📚</div>
      <div className="pwa-text">
        <h3>Install LearnVerse</h3>
        <p>Offline access, push notifications &amp; native app feel.</p>
      </div>
      <div className="pwa-actions">
        <button
          className="pwa-install"
          onClick={handleInstall}
          disabled={installing}
        >
          {installing ? 'Installing…' : '⬇ Install'}
        </button>
        <button className="pwa-dismiss" onClick={handleDismiss}>
          Not now
        </button>
      </div>
    </div>
  );
}