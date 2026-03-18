import React, { useMemo } from 'react';

/**
 * HeatMap — GitHub-style activity heatmap
 *
 * Props:
 *   data      Array<{ date: string, count: number }> | null
 *             If null/empty, renders random demo data.
 *   weeks     number   — how many weeks to display (default 15)
 *   color     string   — base fill color in rgba/hex (default amber)
 *   showLegend boolean — show Less/More legend (default true)
 *   showStats  boolean — show summary stats row (default true)
 */
export default function HeatMap({
  data = null,
  weeks = 15,
  color = '#F59E0B',
  showLegend = true,
  showStats = true,
}) {
  // Build cell matrix: weeks × 7 days
  const cells = useMemo(() => {
    if (data && data.length > 0) {
      // Map provided data into a flat weeks*7 array
      const total = weeks * 7;
      return Array.from({ length: total }, (_, i) => {
        const item = data[data.length - total + i];
        return item ? item.count : 0;
      });
    }
    // Demo random data
    return Array.from({ length: weeks * 7 }, () =>
      Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 8)
    );
  }, [data, weeks]);

  const max = Math.max(...cells, 1);

  const getAlpha = (count) => {
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio < 0.25) return 0.18;
    if (ratio < 0.5)  return 0.42;
    if (ratio < 0.75) return 0.72;
    return 1;
  };

  const totalSessions = cells.reduce((a, b) => a + b, 0);
  const activeDays    = cells.filter(c => c > 0).length;
  const bestDay       = max;

  return (
    <div>
      {/* Grid */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {Array.from({ length: 7 }).map((_, d) => {
              const count = cells[w * 7 + d];
              const alpha = getAlpha(count);
              return (
                <div
                  key={d}
                  title={count > 0 ? `${count} sessions` : 'No activity'}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: alpha === 0
                      ? 'transparent'
                      : `rgba(${hexToRgb(color)}, ${alpha})`,
                    border: alpha === 0 ? '1px solid var(--border)' : 'none',
                    cursor: 'default',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 10, color: 'var(--text-c)' }}>
          <span>Less</span>
          {[0, 0.18, 0.42, 0.72, 1].map((a, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: 2,
              background: a === 0 ? 'transparent' : `rgba(${hexToRgb(color)}, ${a})`,
              border: a === 0 ? '1px solid var(--border)' : 'none',
            }}/>
          ))}
          <span>More</span>
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          {[
            [totalSessions, 'Total Sessions', color],
            [activeDays,    'Active Days',    'var(--sky)'],
            [bestDay,       'Best Day',       'var(--emerald)'],
          ].map(([val, label, c]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: c }}>{val}</div>
              <div style={{ fontSize: 10, color: 'var(--text-b)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Convert hex color to "R, G, B" string for rgba() */
function hexToRgb(hex) {
  // Handle CSS vars — fall back to amber
  if (hex.startsWith('var(') || !hex.startsWith('#')) return '245, 158, 11';
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}