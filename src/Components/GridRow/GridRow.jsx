import React, { useMemo } from 'react';
import Cell from 'Components/Cell';

import './gridRow.css';

export default function Row({ row, setGrid }) {
  return useMemo(
    () => (
      <div className="row" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
        {row.map((node, colId) => (
          <Cell key={colId} node={node} setGrid={setGrid} />
        ))}
      </div>
    ),
    [row, setGrid],
  );
}
