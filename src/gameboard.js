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
    if (!this.pointValid(ship, point, isVertical)) {
      return "Outside of range";
    }
    if (!this.pointContainsShip(point, 1, ship, isVertical)) {
      this.placeShip(ship, point, isVertical);
      return "Placed";
    }
    return "too close to another ship";
  }

  placeShip(ship, point, isVertical) {
    const [x, y] = point;
    if (isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.board[x + i][y] = ship;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        this.board[x][y + i] = ship;
      }
    }
  }

  pointValid(ship, point, isVertical) {
    if (point[0] >= 0 && point[0] < 10 && point[1] >= 0 && point[1] < 10) {
      if (isVertical) {
        if (point[0] + ship.size < 10) {
          return true;
        } else {
          return false;
        }
      } else {
        if (point[1] + ship.size < 10) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  receiveAttack(point) {
    const [x, y] = point;
    if (this.pointContainsShip(point)) {
      this.board[x][y].hit();
      this.board[x][y].isSunk();
      if (this.board[x][y].sunk) {
        return `ship has been sunk`;
      }
      return "Hit";
    }
    this.board[x][y] = 1;
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
        for (let i = 0; i < ship.size; i++) {
          // Check within the board boundaries to avoid out-of-bounds errors
          if (
            (x + i < board.length && typeof board[x + i][y + border] === "object") ||
            (x + i < board.length && typeof board[x + i][y - border] === "object")
          ) {
            return true;
          }
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          // Check within the board boundaries to avoid out-of-bounds errors
          if (
            (x - border >= 0 &&
              x + border < 10 &&
              y + i < board[0].length &&
              typeof board[x + border][y + i] === "object") ||
            (x - border >= 0 &&
              x + border < 10 &&
              y + i < board[0].length &&
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
