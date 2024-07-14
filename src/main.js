import Player from "./player";
import Ship from "./ship";
import "./style.css";

const player = new Player("real");
const computer = new Player("computer");

// function makes board based on player's gameboard
function makeGameboardCells(player, container, enemy = false) {
  player.gameboard.board.forEach((ele) => {
    let row = document.createElement("div");
    row.classList.add("row");
    ele.forEach((ele, i) => {
      let col = document.createElement("div");
      col.classList.add("cell");
      if (enemy) {
        col.classList.add("enemy");
        col.addEventListener("click", () => {
          col.classList.add("hit");
        });
      }
      row.appendChild(col);
    });
    container.appendChild(row);
  });
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
