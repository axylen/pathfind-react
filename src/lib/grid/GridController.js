import Node from './Node';

class GridController {
  data = {
    changed: 0,
    startNode: null,
    finishNode: null,
  };

  constructor(rows, cols) {
    this.rows = Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => new Node(row, col, this)));

    const midRow = Math.round(this.rows.length / 2);
    const startCol = Math.floor(this.rows[0].length / 3);
    const finishCol = Math.ceil((this.rows[0].length / 3) * 2);

    this.setStart(this.rows[midRow][startCol]);
    this.setFinish(this.rows[midRow][finishCol]);
  }

  clear = () => {
    for (let i in this.rows) {
      this.rows[i] = [...this.rows[i]];
      this.rows[i].forEach((node) => node.clear());
    }
  };

  clearWalls = () => {
    for (let i in this.rows) {
      this.rows[i] = [...this.rows[i]];
      this.rows[i].forEach((node) => node.clearWalls());
    }
  };

  updateRow = (row) => {
    this.rows[row] = [...this.rows[row]];
  };

  getStart = () => this.data.startNode;
  setStart = (node) => {
    const old = this.getStart();

    this.data.startNode = node;
    node.isStart = true;

    if (old) {
      old.isStart = false;
      this.updateRow(old.row);
      this.updateRow(node.row);
    }
  };

  getFinish = () => this.data.finishNode;
  setFinish = (node) => {
    const old = this.getFinish();

    this.data.finishNode = node;
    node.isFinish = true;

    if (old) {
      old.isFinish = false;
      this.updateRow(old.row);
      this.updateRow(node.row);
    }
  };
}

export default GridController;
