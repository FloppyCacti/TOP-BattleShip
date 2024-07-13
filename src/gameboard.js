class Gameboard {
  constructor() {
    this.board = this.buildBoard();
  }

  buildBoard() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      arr.push(row);
    }
    return arr;
  }

  place(ship, point, isVertical) {
    if (
      !this.pointValid(ship, point, isVertical) ||
      this.pointContainsShip(point, 1, ship, isVertical)
    )
      return "Outside of range or too close to another ship";
    this.placeShip(ship, point, isVertical);
  }

  placeShip(ship, point, isVertical) {
    const [x, y] = point;
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
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

  receiveAttack(point) {
    if (this.pointContainsShip(point)) {
      this.board[point[0]][point[1]].hit();
      return "Hit";
    }
    return point;
  }

  pointContainsShip(point, border = 0, ship, isVertical) {
    const [x, y] = point;
    const board = this.board;

    if (border === 0) {
      const cell = board[x][y];
      return typeof cell === "object";
    } else {
      if (isVertical) {
        for (let i = 0; i < ship.length; i++) {
          // Check within the board boundaries to avoid out-of-bounds errors
          if (
            (x + i < board.length &&
              typeof board[x + i][y + border] === "object") ||
            (x + i < board.length &&
              typeof board[x + i][y - border] === "object")
          ) {
            return true;
          }
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          // Check within the board boundaries to avoid out-of-bounds errors
          if (
            (y + i < board[0].length &&
              typeof board[x + border][y + i] === "object") ||
            (y + i < board[0].length &&
              typeof board[x - border][y + i] === "object")
          ) {
            return true;
          }
        }
      }
      return false;
    }
  }
}

module.exports = Gameboard;
