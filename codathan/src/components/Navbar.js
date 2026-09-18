import React from 'react';

export default function Navbar({ tabs, active, setActive }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>⚡ Hackathon</span>
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{ ...styles.tab, ...(active === tab ? styles.activeTab : {}) }}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', background: '#161b22', borderBottom: '1px solid #30363d', position: 'sticky', top: 0, zIndex: 100 },
  logo: { color: '#c9ff57', fontWeight: 700, fontSize: '1.2rem' },
  tabs: { display: 'flex', gap: '8px' },
  tab: { background: 'transparent', border: '1px solid #30363d', color: '#8b949e', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' },
  activeTab: { background: '#c9ff57', color: '#0d1117', border: '1px solid #c9ff57', fontWeight: 700 },
};
