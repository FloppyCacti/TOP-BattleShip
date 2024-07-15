import Player from "./player";
import Ship from "./ship";
import "./style.css";

const player = new Player("real");
const computer = new Player("computer");

// function makes board based on player's gameboard
function makeGameboardCells(player, container, enemy = false) {
  player.gameboard.board.forEach((ele, i) => {
    let row = document.createElement("div");
    row.classList.add("row");
    ele.forEach((ele, j) => {
      let col = document.createElement("div");
      row.appendChild(col);
      addCellClass(col, i, j, enemy);
    });
    container.appendChild(row);
  });
}
// add class based on where or not there is ship
function addCellClass(cell, a, b, enemy) {
  cell.classList.add("cell");
  if (enemy) {
    cell.classList.add("enemy");
    cell.addEventListener("click", () => {
      if (computer.gameboard.receiveAttack([a, b]) == "Hit") {
        cell.classList.add("hit-ship");
      } else {
        cell.classList.add("hit");
      }
    });
  }
}

// get div that contains the board
const playerBoardContainer = document.createElement("div");
const computerBoardContainer = document.createElement("div");

// give container divs id
playerBoardContainer.setAttribute("id", "playerBoardContainer");
computerBoardContainer.setAttribute("id", "computerBoardContainer");

// make boards and inserted them into container
makeGameboardCells(player, playerBoardContainer);
makeGameboardCells(computer, computerBoardContainer, true);

// append board containers to main container
const gameBoardContainer = document.getElementById("gameboard-container");
gameBoardContainer.appendChild(playerBoardContainer);
gameBoardContainer.appendChild(computerBoardContainer);
