import React, { useEffect, useState } from 'react';
import './ui.css';

export default function ProgressBar({ pct, color = 'var(--amber)', glow, height = 5, animated = true, style = {} }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { if (animated) { setTimeout(() => setWidth(pct), 200); } else setWidth(pct); }, [pct]);

  return (
    <div className="progress-bar" style={{ '--progress-h': `${height}px`, ...style }}>
      <div
        className="progress-fill"
        style={{
          width: `${width}%`,
          background: color,
          '--progress-glow': glow ? `0 0 8px ${color}80` : 'none',
          transition: animated ? `width 1.1s cubic-bezier(0.4,0,0.2,1)` : 'none',
        }}
      />
    </div>
  );
}

export function RadialProgress({ pct, size = 64, strokeWidth = 5, color = 'var(--amber)', children }) {
  const r    = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface-c)" strokeWidth={strokeWidth}/>
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      {children && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}