import React, { useState } from 'react';
import designData from '../data/designData';

const catColors = {
  UNDERSTAND: '#c9ff57', STRUCTURE: '#57c9ff', PROTECT: '#ff9f57',
  DELIVER: '#c957ff', 'THINK FORWARD': '#57ffb8', 'STAY CONCRETE': '#ff6b6b',
};

export default function Round3Design({ day }) {
  const { scenario, sections } = designData[day] || designData[1];
  const [expanded, setExpanded] = useState(null);
  const [noted, setNoted] = useState({});

  const notedCount = Object.values(noted).filter(Boolean).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <span style={s.round}>ROUND 3 · 15 MARKS · DAY {day}</span>
          <h1 style={s.h1}>Application design</h1>
          <p style={s.sub}>Prepare a written solution using all ten headings in the supplied template.</p>
        </div>
        <div style={s.score}>
          <div style={s.scoreNum}>{notedCount}/10</div>
          <div style={s.scoreLabel}>Noted</div>
        </div>
      </div>

      <div style={s.scenario}>
        <strong style={{ color: '#ff9f57' }}>📋 Scenario:</strong> {scenario}
      </div>

      <div style={s.grid}>
        {sections.map((sec, i) => {
          const color = catColors[sec.cat] || '#c9ff57';
          return (
            <div
              key={i}
              style={{ ...s.card, borderTop: `3px solid ${color}`, ...(noted[i] ? s.cardNoted : {}) }}
            >
              <div style={s.cardHeader} onClick={() => setExpanded(expanded === i ? null : i)}>
                <span style={{ ...s.cat, color }}>{sec.cat}</span>
                <h3 style={s.title}>{sec.title}</h3>
                <span style={s.arrow}>{expanded === i ? '▲' : '▼'}</span>
              </div>

              {expanded === i && (
                <div style={s.body}>
                  <p style={s.desc}>{sec.desc}</p>
                  <button
                    style={{ ...s.noteBtn, background: noted[i] ? '#1c2128' : '#238636' }}
                    onClick={() => setNoted(p => ({ ...p, [i]: !p[i] }))}
                  >
                    {noted[i] ? '↩ Unmark' : '✓ Mark Noted'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  page: { padding: '40px', maxWidth: '1100px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  round: { color: '#ff9f57', fontSize: '0.72rem', letterSpacing: '2px' },
  h1: { fontSize: '2.5rem', fontWeight: 800, margin: '10px 0' },
  sub: { color: '#8b949e', fontSize: '0.9rem', maxWidth: '500px' },
  score: { background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', minWidth: '90px' },
  scoreNum: { fontSize: '2rem', fontWeight: 800, color: '#ff9f57' },
  scoreLabel: { color: '#8b949e', fontSize: '0.75rem' },
  scenario: { background: '#1c2128', border: '1px solid #ff9f57', borderLeft: '4px solid #ff9f57', padding: '14px 18px', borderRadius: '6px', marginBottom: '24px', color: '#ccc', lineHeight: 1.6, fontSize: '0.9rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' },
  card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', overflow: 'hidden' },
  cardNoted: { opacity: 0.8, border: '1px solid #3fb950' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', cursor: 'pointer' },
  cat: { fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', minWidth: '80px' },
  title: { flex: 1, fontSize: '0.95rem', fontWeight: 700 },
  arrow: { color: '#8b949e', fontSize: '0.8rem' },
  body: { padding: '0 16px 16px' },
  desc: { color: '#8b949e', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '12px' },
  noteBtn: { color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
};
