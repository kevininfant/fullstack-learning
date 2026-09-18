import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DaySelector from './components/DaySelector';
import Round1BugFix from './pages/Round1BugFix';
import Round2Refactor from './pages/Round2Refactor';
import Round3Design from './pages/Round3Design';
import Round4Implementation from './pages/Round4Implementation';
import Home from './pages/Home';

const TABS = ['Home', 'R1 · Bug Fix', 'R2 · Refactor', 'R3 · Design', 'R4 · Implement'];

export default function App() {
  const [active, setActive] = useState('Home');
  const [day, setDay] = useState(1);

  const renderPage = () => {
    switch (active) {
      case 'R1 · Bug Fix': return <Round1BugFix day={day} />;
      case 'R2 · Refactor': return <Round2Refactor day={day} />;
      case 'R3 · Design': return <Round3Design day={day} />;
      case 'R4 · Implement': return <Round4Implementation />;
      default: return <Home setActive={setActive} />;
    }
  };

  return (
    <div>
      <Navbar tabs={TABS} active={active} setActive={setActive} />
      {active !== 'Home' && active !== 'R4 · Implement' && (
        <DaySelector day={day} setDay={setDay} />
      )}
      <main style={{ minHeight: '100vh' }}>{renderPage()}</main>
    </div>
  );
}
