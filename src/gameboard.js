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
    const [x, y] = point;
    if (isVertical) {
      if (x + ship.size > 10) {
        return false;
      }
      for (let i = 0; i < ship.size; i++) {
        if (this.board[x + i][y] !== 0) {
          return false;
        }
      }
    } else {
      if (y + ship.size > 10) {
        return false;
      }
      for (let i = 0; i < ship.size; i++) {
        if (this.board[x][y + i] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  receiveAttack(point) {
    const [x, y] = point;
    if (this.pointContainsShip(point)) {
      this.board[x][y].hit();
      if (this.board[x][y].sunk) {
        return `Sunk`;
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
      return typeof board[x][y] === "object";
    } else {
      if (isVertical) {
        for (let i = 0; i < ship.size; i++) {
          if (
            (x + i < 10 &&
              y + border < 10 &&
              typeof board[x + i][y + border] === "object") ||
            (x + i < 10 &&
              y - border >= 0 &&
              typeof board[x + i][y - border] === "object")
          ) {
            return true;
          }
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          if (
            (x + border < 10 &&
              y + i < 10 &&
              typeof board[x + border][y + i] === "object") ||
            (x - border >= 0 &&
              y + i < 10 &&
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
