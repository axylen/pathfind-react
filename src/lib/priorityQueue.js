class PriorityQueue {
  values = [];

  enqueue = (val, priority) => {
    this.values.push({ val, priority });
    this.bubbleUp();
  };

  bubbleUp = () => {
    let id = this.values.length - 1;
    const el = this.values[id];

    while (id > 0) {
      const parentId = Math.floor((id - 1) / 2);
      const parent = this.values[parentId];

      if (el.priority >= parent.priority) return;

      this.values[parentId] = el;
      this.values[id] = parent;
      id = parentId;
    }
  };

  dequeue = () => {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  };

  sinkDown = () => {
    const values = this.values;
    const len = values.length;
    const el = values[0];

    let id = 0;

    while (true) {
      const leftChildId = id * 2 + 1;
      const rightChildId = id * 2 + 2;

      let leftChild, rightChild;
      let swap = null;

      if (leftChildId < len) {
        leftChild = values[leftChildId];
        if (leftChild.priority < el.priority) swap = leftChildId;
      }

      if (rightChildId < len) {
        rightChild = values[rightChildId];
        const isSwaped = swap !== null;

        if ((!isSwaped && rightChild.priority < el.priority) || (isSwaped && rightChild.priority < leftChild.priority)) {
          swap = rightChildId;
        }
      }

      if (swap === null) return;
      [values[id], values[swap], id] = [values[swap], el, swap];
    }
  };
}

export default PriorityQueue;
