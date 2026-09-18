import React from 'react';

const rounds = [
  { label: 'R1', title: 'Bug Fixing', time: '10:30–11:30 AM', marks: 20, color: '#c9ff57', desc: '10 bugs — 8 given, 2 to find independently' },
  { label: 'R2', title: 'Code Refactoring', time: '11:30 AM–12:30 PM', marks: 20, color: '#57c9ff', desc: '5 tasks — preserve behavior, improve quality' },
  { label: 'R3', title: 'App Design', time: '12:30–1:30 PM', marks: 15, color: '#ff9f57', desc: 'Written solution using 10 design headings' },
  { label: 'R4', title: 'Technical Implementation', time: '2:30–5:30 PM', marks: 45, color: '#c957ff', desc: '3 minimum implementations — 15 marks each' },
];

export default function Home({ setActive }) {
  return (
    <div style={s.page}>
      <div style={s.hero}>
        <p style={s.tag}>HACKATHON DAY</p>
        <h1 style={s.h1}>One day. <span style={{ color: '#c9ff57' }}>Four rounds.</span></h1>
        <p style={s.sub}>Be seated and signed in before 10:30 AM. Each round closes at its stated end time.</p>
      </div>

      <div style={s.grid}>
        {rounds.map(r => (
          <div key={r.label} style={{ ...s.card, borderTop: `3px solid ${r.color}` }}>
            <div style={{ ...s.badge, background: r.color, color: '#0d1117' }}>{r.label}</div>
            <h2 style={s.cardTitle}>{r.title}</h2>
            <p style={s.time}>{r.time}</p>
            <p style={s.desc}>{r.desc}</p>
            <div style={s.marks}>{r.marks} marks</div>
          </div>
        ))}
      </div>

      <div style={s.cta}>
        <button style={s.btn} onClick={() => setActive('R1 · Bug Fix')}>Start Round 1 →</button>
      </div>
    </div>
  );
}

const s = {
  page: { padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' },
  hero: { textAlign: 'center', marginBottom: '60px' },
  tag: { color: '#c9ff57', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '16px' },
  h1: { fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px' },
  sub: { color: '#8b949e', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '50px' },
  card: { background: '#161b22', borderRadius: '12px', padding: '28px', border: '1px solid #30363d' },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' },
  time: { color: '#c9ff57', fontSize: '0.8rem', marginBottom: '12px' },
  desc: { color: '#8b949e', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px' },
  marks: { color: '#fff', fontWeight: 700, fontSize: '1.1rem' },
  cta: { textAlign: 'center' },
  btn: { background: '#c9ff57', color: '#0d1117', border: 'none', padding: '14px 36px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' },
};
