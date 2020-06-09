import React, { useState } from 'react';
import Grid from 'Components/Grid';
import Header from 'Components/Header';

const ROWS = 40;
const COLS = 100;

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      <Header setStarted={setStarted} started={started} />
      <Grid rows={ROWS} cols={COLS} setStarted={setStarted} started={started} />
    </div>
  );
}

export default App;
