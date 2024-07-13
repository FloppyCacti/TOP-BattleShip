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
  expect(gameBoard.board[5][4]).toBe(testShip);
});

it("check if cordinates are out of range", () => {
  expect(gameBoard.place(testShip, [11, 11], true)).toBe("Outside of range");
});

it("check if cordinates are hit", () => {
  expect(gameBoard.receiveAttack([3, 3])).toEqual([3, 3]);
});

it("check if receiveAttack records hit", () => {
  gameBoard.place(testShip, [5, 4], true);
  gameBoard.receiveAttack([5, 4]);
  expect(testShip.hits).toBe(1);
});

it("check if receiveAttack records misses", () => {
  expect(gameBoard.receiveAttack([1, 2])).toEqual([1, 2]);
});

it("check if cordinate contain ship", () => {
  gameBoard.place(testShip, [3, 8]);
  expect(gameBoard.pointContainsShip([3, 8])).toBe(true);
  expect(gameBoard.pointContainsShip([1, 1])).toBe(false);
});
