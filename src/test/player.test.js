const Player = require("../player");

let testPlayer;

beforeEach(() => {
  testPlayer = new Player("real");
});

it("check player type", () => {
  expect(testPlayer.type).toBe("real");
});

it("player has gameboard", () => {
  expect(testPlayer.gameboard.board.length).toBe(10);
});
