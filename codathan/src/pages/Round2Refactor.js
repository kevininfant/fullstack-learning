import React, { useState } from 'react';
import refactorData from '../data/refactorData';

export default function Round2Refactor({ day }) {
  const tasks = refactorData[day] || refactorData[1];
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('before');
  const [done, setDone] = useState({});

  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <span style={s.round}>ROUND 2 · 20 MARKS · DAY {day}</span>
          <h1 style={s.h1}><span style={{ color: '#57c9ff' }}>5 tasks</span><br />Code refactoring</h1>
          <p style={s.sub}>Improve each source sample without changing its intended output or behavior.</p>
        </div>
        <div style={s.score}>
          <div style={s.scoreNum}>{doneCount}/5</div>
          <div style={s.scoreLabel}>Done</div>
        </div>
      </div>

      <div style={s.marks}>
        <div style={s.markCard}><strong style={{ color: '#57c9ff' }}>2 MARKS</strong><p>Preserve behavior</p></div>
        <div style={s.markCard}><strong style={{ color: '#57c9ff' }}>1 MARK</strong><p>Improve quality</p></div>
        <div style={s.markCard}><strong style={{ color: '#57c9ff' }}>1 MARK</strong><p>Explain the change</p></div>
      </div>

      <div style={s.list}>
        {tasks.map(task => (
          <div key={task.id} style={{ ...s.card, ...(selected === task.id ? s.cardActive : {}), ...(done[task.id] ? s.cardDone : {}) }}>
            <div style={s.cardHeader} onClick={() => { setSelected(selected === task.id ? null : task.id); setView('before'); }}>
              <span style={s.taskNum}>Task {task.id}</span>
              <h3 style={s.taskTitle}>{task.title}</h3>
              {done[task.id] && <span style={s.doneBadge}>✓</span>}
              <span style={s.arrow}>{selected === task.id ? '▲' : '▼'}</span>
            </div>

            {selected === task.id && (
              <div style={s.detail}>
                <p style={s.issue}><strong style={{ color: '#ff9f57' }}>Issue:</strong> {task.issue}</p>

                <div style={s.toggle}>
                  <button style={{ ...s.tBtn, ...(view === 'before' ? s.tActive : {}) }} onClick={() => setView('before')}>❌ Before</button>
                  <button style={{ ...s.tBtn, ...(view === 'after' ? s.tActive : {}) }} onClick={() => setView('after')}>✅ After</button>
                </div>

                <pre style={s.pre}>{view === 'before' ? task.before : task.after}</pre>

                <div style={s.explain}>
                  <strong style={{ color: '#57c9ff' }}>Why this change?</strong>
                  <p style={{ color: '#8b949e', marginTop: '6px', lineHeight: 1.6, fontSize: '0.88rem' }}>{task.explanation}</p>
                </div>

                <button
                  style={{ ...s.markBtn, background: done[task.id] ? '#1c2128' : '#238636' }}
                  onClick={() => setDone(p => ({ ...p, [task.id]: !p[task.id] }))}
                >
                  {done[task.id] ? '↩ Unmark' : '✓ Mark Complete'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: { padding: '40px', maxWidth: '900px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  round: { color: '#57c9ff', fontSize: '0.72rem', letterSpacing: '2px' },
  h1: { fontSize: '2.5rem', fontWeight: 800, margin: '10px 0' },
  sub: { color: '#8b949e', fontSize: '0.9rem' },
  score: { background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', minWidth: '90px' },
  scoreNum: { fontSize: '2rem', fontWeight: 800, color: '#57c9ff' },
  scoreLabel: { color: '#8b949e', fontSize: '0.75rem' },
  marks: { display: 'flex', gap: '12px', marginBottom: '24px' },
  markCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '14px 18px', flex: 1, fontSize: '0.85rem', color: '#ccc' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', overflow: 'hidden' },
  cardActive: { border: '1px solid #57c9ff' },
  cardDone: { border: '1px solid #3fb950', opacity: 0.85 },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', cursor: 'pointer' },
  taskNum: { color: '#57c9ff', fontSize: '0.72rem', fontWeight: 700, minWidth: '48px' },
  taskTitle: { flex: 1, fontSize: '0.95rem', fontWeight: 600 },
  doneBadge: { background: '#3fb95022', color: '#3fb950', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px' },
  arrow: { color: '#8b949e', fontSize: '0.8rem' },
  detail: { padding: '0 20px 20px' },
  issue: { color: '#8b949e', fontSize: '0.83rem', marginBottom: '14px' },
  toggle: { display: 'flex', gap: '8px', marginBottom: '10px' },
  tBtn: { background: '#0d1117', border: '1px solid #30363d', color: '#8b949e', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem' },
  tActive: { background: '#1c2128', border: '1px solid #57c9ff', color: '#fff' },
  pre: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '14px', color: '#e6edf3', fontSize: '0.76rem', overflowX: 'auto', whiteSpace: 'pre-wrap', marginBottom: '14px' },
  explain: { background: '#1c2128', borderRadius: '6px', padding: '14px', borderLeft: '3px solid #57c9ff', marginBottom: '14px' },
  markBtn: { color: '#fff', border: 'none', padding: '7px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem' },
};
