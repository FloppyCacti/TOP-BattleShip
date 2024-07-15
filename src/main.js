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
      addCellClass(col, i, j, enemy, computer);
    });
    container.appendChild(row);
  });
}
// add class based on where or not there is ship
function addCellClass(cell, a, b, enemy, enemyName) {
  cell.classList.add("cell");
  if (enemy) {
    cell.classList.add("enemy");
    cell.addEventListener("click", () => {
      if (enemyName.gameboard.receiveAttack([a, b]) == "Hit") {
        cell.classList.add("hit-ship");
      } else {
        cell.classList.add("hit");
      }
      computerTurn();
      checkShipSunk();
    });
  }
}

function randomNumber(num) {
  return Math.floor(Math.random() * num);
}
// computer's turn
function computerTurn() {
  const row = randomNumber(10);
  const col = randomNumber(10);
  const div = playerBoardContainer.querySelector(
    `.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`
  );

  if (div.classList.contains("hit") || div.classList.contains("hit-ship")) {
    computerTurn();
  } else {
    if (player.gameboard.receiveAttack([row, col]) == "Hit") {
      div.classList.add("hit-ship");
    } else {
      div.classList.add("hit");
    }
  }
}

function checkShipSunk() {
  carrier.isSunk();
  battleship.isSunk();
  cruiser.isSunk();
  submarine.isSunk();
  destroyer.isSunk();

  if (
    carrier.sunk &&
    battleship.sunk &&
    cruiser.sunk &&
    cruiser.sunk &&
    submarine.sunk &&
    destroyer.sunk
  ) {
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
