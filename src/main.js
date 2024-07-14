import Player from "./player";
import Ship from "./ship";
import "./style.css";

const player = new Player("real");
const computer = new Player("computer");

// div contains the board
const playerBoardContainer = document.createElement("div");
const computerBoardContainer = document.createElement("div");

// give divs id
playerBoardContainer.setAttribute("id", "playerBoardContainer");
computerBoardContainer.setAttribute("id", "computerBoardContainer");

// append player board elements to board container
player.gameboard.board.forEach((ele) => {
  let row = document.createElement("div");
  row.classList = "row";
  ele.forEach((ele) => {
    let col = document.createElement("div");
    col.classList = "cell";
    row.appendChild(col);
  });
  playerBoardContainer.appendChild(row);
});

// append computer board elements to board container
computer.gameboard.board.forEach((ele) => {
  let row = document.createElement("div");
  row.classList = "row";
  ele.forEach((ele) => {
    let col = document.createElement("div");
    col.classList = "cell";
    row.appendChild(col);
  });
  computerBoardContainer.appendChild(row);
});

// append board containers to main container
const gameBoardContainer = document.getElementById("gameboard-container");
gameBoardContainer.appendChild(playerBoardContainer);
gameBoardContainer.appendChild(computerBoardContainer);
