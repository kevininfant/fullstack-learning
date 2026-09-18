import React from 'react';

export default function DaySelector({ day, setDay }) {
  return (
    <div style={s.bar}>
      <span style={s.label}>Practice Day:</span>
      <div style={s.days}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(d => (
          <button
            key={d}
            onClick={() => setDay(d)}
            style={{ ...s.btn, ...(day === d ? s.active : {}) }}
          >
            Day {d}
          </button>
        ))}
      </div>
    </div>
  );
}

const s = {
  bar: { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 40px', background: '#0d1117', borderBottom: '1px solid #21262d', flexWrap: 'wrap' },
  label: { color: '#8b949e', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' },
  days: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  btn: { background: '#161b22', border: '1px solid #30363d', color: '#8b949e', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.15s' },
  active: { background: '#c9ff57', color: '#0d1117', border: '1px solid #c9ff57', fontWeight: 700 },
};
