import React, { useState, useEffect } from 'react';
import GridRow from 'Components/GridRow';
import { findPathBySteps } from 'lib/algorithms/dijkstra';

import './grid.css';
import { GridController, createGraph, findPath } from 'lib/grid';

export default function Grid({ rows, cols, started, setStarted }) {
  const [grid, setGrid] = useState(new GridController(rows, cols));

  useEffect(() => {
    if (!started) return;

    const graph = createGraph(grid.rows);
    const step = findPathBySteps(graph, grid.getStart().toString(), grid.getFinish().toString());

    const cancel = findPath(step, {
      onStep: (values) => {
        values.map((key) => graph.get(key)).forEach((node) => node.setVisited());
        setGrid({ ...grid });
      },
      onPath: (values) => {
        values.map((key) => graph.get(key)).forEach((node) => node.setPath());
        setGrid({ ...grid });
      },
    });

    return () => {
      cancel();
      grid.clear();
      setGrid({ ...grid });
      setStarted(false);
    };
  }, [grid.data.changed, started]);

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {grid.rows.map((row, rowId) => (
        <GridRow row={row} key={rowId} setGrid={setGrid} />
      ))}
    </div>
  );
}
