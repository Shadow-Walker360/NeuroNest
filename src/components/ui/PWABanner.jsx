import React, { useEffect, useState } from 'react';
import './ui.css';

export default function PWABanner() {
  const [prompt, setPrompt]     = useState(null);
  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPrompt(e); setVisible(true); };
    window.addEventListener('beforeinstallprompt', handler);
    // Show demo banner after 5s if no native prompt
    const t = setTimeout(() => {
      if (!prompt && !dismissed) setVisible(true);
    }, 5000);
    return () => { window.removeEventListener('beforeinstallprompt', handler); clearTimeout(t); };
  }, []);

  const install = async () => {
    if (prompt) {
      prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
    }
    setVisible(false);
    setDismissed(true);
  };

  const dismiss = () => { setVisible(false); setDismissed(true); };

  if (!visible || dismissed) return null;

  return (
    <div className="pwa-banner">
      <div className="pwa-logo">📚</div>
      <div className="pwa-text">
        <h3>Install LearnVerse</h3>
        <p>Get the full experience — offline access, push notifications & native feel.</p>
      </div>
      <div className="pwa-actions">
        <button className="pwa-install" onClick={install}>⬇ Install</button>
        <button className="pwa-dismiss" onClick={dismiss}>Not now</button>
      </div>
    </div>
  );
}