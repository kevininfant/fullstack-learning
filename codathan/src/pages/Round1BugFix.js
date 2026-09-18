import React, { useState } from 'react';
import bugsData from '../data/bugsData';

export default function Round1BugFix({ day }) {
  const bugs = bugsData[day] || bugsData[1];
  const [selected, setSelected] = useState(null);
  const [showFix, setShowFix] = useState({});
  const [solved, setSolved] = useState({});

  const toggleFix = (id, e) => { e.stopPropagation(); setShowFix(p => ({ ...p, [id]: !p[id] })); };
  const markSolved = (id, e) => { e.stopPropagation(); setSolved(p => ({ ...p, [id]: !p[id] })); };

  const solvedCount = Object.values(solved).filter(Boolean).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <span style={s.round}>ROUND 1 · 20 MARKS · DAY {day}</span>
          <h1 style={s.h1}><span style={{ color: '#c9ff57' }}>10 bugs</span><br />Bug fixing</h1>
          <p style={s.sub}>Eight bugs are identified for you. Two more must be discovered independently.</p>
        </div>
        <div style={s.score}>
          <div style={s.scoreNum}>{solvedCount}/10</div>
          <div style={s.scoreLabel}>Solved</div>
        </div>
      </div>

      <div style={s.infoBox}>
        Each bug: <strong>0.5</strong> for root cause + <strong>1.5</strong> for a correct, regression-free fix.
      </div>

      <div style={s.grid}>
        {bugs.map(bug => (
          <div
            key={bug.id}
            onClick={() => setSelected(selected === bug.id ? null : bug.id)}
            style={{ ...s.card, ...(selected === bug.id ? s.cardActive : {}), ...(solved[bug.id] ? s.cardSolved : {}) }}
          >
            <div style={s.cardTop}>
              <span style={s.bugNum}>Bug #{bug.id}</span>
              {solved[bug.id] && <span style={s.solvedBadge}>✓ Solved</span>}
            </div>
            <h3 style={s.bugTitle}>{bug.title}</h3>

            {selected === bug.id && (
              <div style={s.detail} onClick={e => e.stopPropagation()}>
                <p style={s.rootCause}><strong style={{ color: '#ff9f57' }}>Root Cause:</strong> {bug.rootCause}</p>

                <div style={s.codeBlock}>
                  <div style={s.codeLabel}>❌ Buggy Code</div>
                  <pre style={s.pre}>{bug.buggy}</pre>
                </div>

                <div style={s.actions}>
                  <button style={s.fixBtn} onClick={(e) => toggleFix(bug.id, e)}>
                    {showFix[bug.id] ? '🙈 Hide Fix' : '✅ Show Fix'}
                  </button>
                  <button style={{ ...s.fixBtn, background: solved[bug.id] ? '#388bfd22' : '#238636' }} onClick={(e) => markSolved(bug.id, e)}>
                    {solved[bug.id] ? '↩ Unmark' : '✓ Mark Solved'}
                  </button>
                </div>

                {showFix[bug.id] && (
                  <div style={{ ...s.codeBlock, borderColor: '#3fb950' }}>
                    <div style={{ ...s.codeLabel, color: '#3fb950' }}>✅ Fixed Code</div>
                    <pre style={s.pre}>{bug.fixed}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: { padding: '40px', maxWidth: '1100px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  round: { color: '#c9ff57', fontSize: '0.72rem', letterSpacing: '2px' },
  h1: { fontSize: '2.5rem', fontWeight: 800, margin: '10px 0' },
  sub: { color: '#8b949e', fontSize: '0.9rem' },
  score: { background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', minWidth: '90px' },
  scoreNum: { fontSize: '2rem', fontWeight: 800, color: '#c9ff57' },
  scoreLabel: { color: '#8b949e', fontSize: '0.75rem' },
  infoBox: { background: '#1c2128', borderLeft: '4px solid #c9ff57', padding: '12px 16px', borderRadius: '6px', marginBottom: '24px', color: '#ccc', fontSize: '0.9rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' },
  card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '18px', cursor: 'pointer', transition: 'border 0.2s' },
  cardActive: { border: '1px solid #c9ff57' },
  cardSolved: { border: '1px solid #3fb950', opacity: 0.85 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  bugNum: { color: '#c9ff57', fontSize: '0.72rem', fontWeight: 700 },
  solvedBadge: { background: '#3fb95022', color: '#3fb950', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px' },
  bugTitle: { fontSize: '0.95rem', fontWeight: 600 },
  detail: { marginTop: '14px' },
  rootCause: { color: '#8b949e', fontSize: '0.83rem', marginBottom: '12px', lineHeight: 1.6 },
  codeBlock: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '12px', marginBottom: '10px' },
  codeLabel: { fontSize: '0.72rem', color: '#ff6b6b', marginBottom: '6px', fontWeight: 600 },
  pre: { color: '#e6edf3', fontSize: '0.76rem', overflowX: 'auto', whiteSpace: 'pre-wrap', margin: 0 },
  actions: { display: 'flex', gap: '8px', marginBottom: '10px' },
  fixBtn: { background: '#238636', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
};
