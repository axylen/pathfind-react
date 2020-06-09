class Node {
  isStart = false;
  isFinish = false;
  isVisited = false;
  isWall = false;
  isPath = false;

  constructor(row, col, controller) {
    this.row = row;
    this.col = col;
    this.controller = controller;
  }

  toString = () => `${this.row}_${this.col}`;

  setMode = (mode) => {
    this.controller.mode = mode;
  };

  toggle = () => {
    const mode = this.controller.mode;
    if (mode === 'addWall' && !this.isStart && !this.isFinish) {
      this.isWall = true;
    } else if (mode === 'removeWall') {
      this.isWall = false;
    } else if (mode === 'moveStart' && !this.isFinish && !this.isWall) {
      this.setStart();
    } else if (mode === 'moveFinish' && !this.isStart && !this.isWall) {
      this.setFinish();
    } else {
      return;
    }

    this.controller.data.changed++;

    this.controller.updateRow(this.row);
  };

  setVisited = () => {
    this.isVisited = true;
    this.controller.updateRow(this.row);
  };

  setPath = () => {
    this.isPath = true;
    this.controller.updateRow(this.row);
  };

  setStart = () => this.controller.setStart(this);

  setFinish = () => this.controller.setFinish(this);

  clear = () => {
    this.isVisited = false;
    this.isPath = false;
  };

  clearWalls = () => {
    this.isWall = false;
    this.clear();
  };
}

export default Node;
