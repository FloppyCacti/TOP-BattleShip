const Gameboard = require("../gameboard");
const Ship = require("../ship");

it("check gameboard size", () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.board.length).toBe(10);
});

it("place ship at specific coordinates", () => {
  const testShip = new Ship(1);
  const gameBoard = new Gameboard();

  gameBoard.place(testShip, [5][4]);
  expect(gameBoard.board[5][4]).toBe(testShip);
});
