const GameBoard = require("./gameboard");

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new GameBoard();
    this.ships = {};
  }
}

module.exports = Player;
