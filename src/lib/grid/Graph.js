import WeightGrapg from 'lib/weightGraph';

const createGraph = (rows) => {
  const graph = new WeightGrapg();

  rows.forEach((row) =>
    row.forEach((node) => {
      graph.addVertex(node);
    }),
  );

  rows.forEach((row, rowId) =>
    row.forEach((node, colId) => {
      if (node.isWall) return;

      const right = row[colId + 1];
      if (right && !right.isWall) {
        graph.addEdge(node, right);
        graph.addEdge(right, node);
      }

      const bottom = (rows[rowId + 1] || [])[colId];
      if (bottom && !bottom.isWall) {
        graph.addEdge(node, bottom);
        graph.addEdge(bottom, node);
      }
    }),
  );

  return graph;
};

export default createGraph;
