import React from 'react';

import './Header.css';

export default function Header({ started, setStarted }) {
  return (
    <header className="header">
      <button className="start_btn" onClick={() => setStarted((started) => !started)}>
        {started ? 'Clear' : 'Start'}
      </button>
    </header>
  );
}
