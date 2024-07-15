const GameBoard = require("./gameboard");

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new GameBoard();
    this.ships = {};
  }
}

module.exports = Player;
