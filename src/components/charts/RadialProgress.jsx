import React, { useEffect, useState } from 'react';

/**
 * RadialProgress — Animated circular progress ring
 *
 * Props:
 *   pct         number     — 0–100 percentage
 *   size        number     — diameter in px (default 64)
 *   strokeWidth number     — ring thickness (default 5)
 *   color       string     — ring color (default var(--amber))
 *   trackColor  string     — background ring color
 *   animated    boolean    — animate on mount (default true)
 *   children    ReactNode  — content rendered in centre
 */
export default function RadialProgress({
  pct = 0,
  size = 64,
  strokeWidth = 5,
  color = 'var(--amber)',
  trackColor = 'var(--surface-c)',
  animated = true,
  children,
  style = {},
}) {
  const [current, setCurrent] = useState(animated ? 0 : pct);

  useEffect(() => {
    if (!animated) { setCurrent(pct); return; }
    const t = setTimeout(() => setCurrent(pct), 200);
    return () => clearTimeout(t);
  }, [pct, animated]);

  const r    = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (current / 100) * circ;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{
            transition: animated
              ? 'stroke-dasharray 1.3s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
            filter: `drop-shadow(0 0 6px ${color}60)`,
          }}
        />
      </svg>

      {/* Centre content */}
      {children && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}