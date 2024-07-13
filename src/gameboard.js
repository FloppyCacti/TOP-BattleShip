class Gameboard {
  constructor() {
    this.board = this.buildBoard();
  }

  buildBoard() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push([]);
      }
      arr.push(row);
    }
    return arr;
  }

  place(ship, point, isVertical) {
    if (!this.pointValid(ship, point, isVertical)) return "Outside of range";
    this.board[point[0]][point[1]] = ship;
  }

  pointValid(ship, point, isVertical) {
    if (point[0] >= 0 && point[0] < 10 && point[1] >= 0 && point[1] < 10) {
      if (isVertical) {
        if (point[1] + ship.length < 10) {
          return true;
        }
      } else {
        if (point[0] + ship.length < 10) {
          return true;
        }
      }
    } else {
      return false;
    }
  }
}

module.exports = Gameboard;
