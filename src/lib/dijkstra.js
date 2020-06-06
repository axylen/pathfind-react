import PriorityQueue from './priorityQueue';

const buildInitialState = (graph, start) => {
  const nodes = new PriorityQueue();
  const distances = {};
  const previous = {};

  for (let vertex in graph.adjacencyList) {
    distances[vertex] = vertex === String(start) ? 0 : Infinity;
    nodes.enqueue(vertex, distances[vertex]);
    previous[vertex] = null;
  }

  return { nodes, distances, previous };
};

const buildPath = (prevNodes, smallest) => {
  const path = [];
  while (prevNodes[smallest] !== null) {
    path.push(smallest);
    smallest = prevNodes[smallest];
  }

  if (!path.length) return null;

  path.push(smallest);
  return path.reverse();
};

function* findPathBySteps(graph, from, to) {
  if (from === to) return [to];

  const { nodes, distances, previous } = buildInitialState(graph, from);

  while (nodes.values.length) {
    const smallest = nodes.dequeue().val;

    if (smallest === to) return buildPath(previous, smallest);

    if (!smallest && distances[smallest] === Infinity) continue;

    const arr = [];
    for (let nextNode of graph.adjacencyList[smallest]) {
      const candidateDistance = distances[smallest] + nextNode.weight;
      const nextNeighbor = nextNode.node;

      if (candidateDistance >= distances[nextNeighbor]) continue;
      distances[nextNeighbor] = candidateDistance;
      previous[nextNeighbor] = smallest;
      nodes.enqueue(nextNeighbor, candidateDistance);

      arr.push(nextNeighbor);
    }

    if (arr.length) yield arr;
  }
}

const findPath = (graph, from, to) => {
  const find = findPathBySteps(graph, from, to);

  while (true) {
    let val = find.next();
    if (val.done) return val.value;
  }
};

export { findPath, findPathBySteps };
