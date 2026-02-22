import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext.jsx';
import './ui.css';

const ICONS = { success: '✅', error: '❌', warning: '⚠️', info: '💡' };

function ToastItem({ id, type, title, message, duration, onRemove }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOut(true);
      setTimeout(() => onRemove(id), 350);
    }, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`toast-item ${type} ${out ? 'out' : ''}`}>
      <span className="toast-icon">{ICONS[type]}</span>
      <div className="toast-body">
        {title   && <div className="toast-title">{title}</div>}
        {message && <div className="toast-message">{message}</div>}
      </div>
      <button className="toast-close" onClick={() => { setOut(true); setTimeout(() => onRemove(id), 350); }}>×</button>
    </div>
  );
}

export default function Toast() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onRemove={removeToast} />
      ))}
    </div>
  );
}