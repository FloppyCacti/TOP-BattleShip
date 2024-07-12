const Ship = require("../ship");

it("inital ship setup", () => {
  const testShip = new Ship(4);
  expect(testShip.length).toBe(4);
  expect(testShip.hits).toBe(0);
  expect(testShip.sunk).toBe(false);
});

it("function to increase ship hits", () => {
  const testShip = new Ship(4, 0);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

it("function to check if ship is sunk", () => {
  const testShip = new Ship(4, 4, false);
  testShip.isSunk();
  expect(testShip.sunk).toBe(true);
});
