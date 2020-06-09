import React from 'react';

import './cell.css';

const cn = (...classNames) => classNames.filter(Boolean).join(' ');

export default function Cell({ node, setGrid }) {
  const cellClass = cn(
    'cell',
    node.isWall && 'cell_wall',
    node.isVisited && 'cell_visited',
    node.isPath && 'cell_path',
    node.isStart && 'cell_start',
    node.isFinish && 'cell_finish',
  );

  const toggle = () => {
    node.toggle();
    setGrid((grid) => ({ ...grid }));
  };

  return (
    <div
      className={cellClass}
      onMouseDown={() => {
        if (node.isStart) {
          node.setMode('moveStart');
        } else if (node.isFinish) {
          node.setMode('moveFinish');
        } else {
          node.setMode(node.isWall ? 'removeWall' : 'addWall');
          toggle();
        }
      }}
      onMouseEnter={(e) => {
        if (e.buttons !== 0) toggle();
      }}
    />
  );
}
