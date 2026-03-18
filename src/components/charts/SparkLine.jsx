import React from 'react';

/**
 * SparkLine — Minimal inline SVG trend line
 *
 * Props:
 *   data    number[]   — array of values to plot
 *   color   string     — stroke color (CSS color or var())
 *   width   number     — SVG width in px (default 90)
 *   height  number     — SVG height in px (default 36)
 *   filled  boolean    — whether to render a filled area under the line
 *   opacity number     — overall opacity (default 0.75)
 */
export default function SparkLine({
  data = [],
  color = 'var(--amber)',
  width = 90,
  height = 36,
  filled = false,
  opacity = 0.75,
}) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 3;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y];
  });

  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ');

  // Filled area path: line + close to bottom
  const areaPath = points.length
    ? `M${points[0][0]},${points[0][1]} ` +
      points.slice(1).map(([x, y]) => `L${x},${y}`).join(' ') +
      ` L${points[points.length - 1][0]},${height} L${points[0][0]},${height} Z`
    : '';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', opacity }}
    >
      {filled && (
        <path
          d={areaPath}
          fill={color}
          fillOpacity={0.12}
        />
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last point dot */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="2.5"
          fill={color}
        />
      )}
    </svg>
  );
}