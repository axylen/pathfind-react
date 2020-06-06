class WeightGrapg {
  adjacencyList = {};
  constructor(cells = []) {
    this.from2dArray(cells);
  }

  from2dArray = (arr) => {
    const flat = arr.flat();
    const xCount = arr[0].length;

    flat.forEach((v, i) => this.addVertex(i));

    flat.forEach((v, i) => {
      if (!v) return;

      const right = i + 1;
      const bottom = i + xCount;

      if (right % xCount && flat[right]) {
        this.addEdge(i, right);
        this.addEdge(right, i);
      }

      if (flat[bottom]) {
        this.addEdge(i, bottom);
        this.addEdge(bottom, i);
      }
    });
  };

  addVertex = (vertex) => {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  };

  addEdge = (v1, v2, weight = 1) => {
    this.adjacencyList[v1].push({ node: v2.toString(), weight });
  };
}

export default WeightGrapg;
