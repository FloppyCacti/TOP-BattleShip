const Gameboard = require("../gameboard");
const Ship = require("../ship");

let gameBoard;
let testShip;

beforeEach(() => {
  gameBoard = new Gameboard();
  testShip = new Ship(1);
});

it("check gameboard size", () => {
  expect(gameBoard.board.length).toBe(10);
});

it("place ship at specific coordinates", () => {
  gameBoard.place(testShip, [5, 4], true);
  expect(gameBoard.board[(5, 4)]).toBe(testShip);
});

it("check if cordinates are invalid", () => {
  expect(gameBoard.place(testShip, [11, 11], true)).toBe("Outside of range");
});
