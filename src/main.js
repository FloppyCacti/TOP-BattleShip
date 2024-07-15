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
      otherPlayersTurn();
    });
  }
}

// generate rounded random numbers
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

// check if all the ships are sunk
function checkShipSunk(player) {
  const ships = player.ships;

  if (ships.every((ship) => ship.sunk)) {
  }
}

// make carrier, battleship, cruiser, submarine, destroyer
function makeDefaultShip(player) {
  player.ships = {
    carrier: new Ship(5),
    battleship: new Ship(4),
    cruiser: new Ship(3),
    submarine: new Ship(3),
    destroyer: new Ship(2),
  };
}

// take the player.ships and place then in the gameboard
function randomlyPlaceShip(player) {
  for (let ship in player.ships) {
    let row = randomNumber(10);
    let col = randomNumber(10);
    let vertical = randomNumber(2) === 0;
    let place = player.gameboard.place(player.ships[ship], [row, col], vertical);
    console.log(place);
    while (place !== "Placed") {
      row = randomNumber(10);
      col = randomNumber(10);
      vertical = randomNumber(2) === 0;
      place = player.gameboard.place(player.ships[ship], [row, col], vertical);
      console.log(place);
    }
  }
}

// if going against computer -> checkShipSunk and computerTurn
function otherPlayersTurn() {
  checkShipSunk(player);
  computerTurn();
  checkShipSunk(computer);
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

// generate ships for both player
makeDefaultShip(player);
makeDefaultShip(computer);

// randomly place computer's ships
randomlyPlaceShip(computer);

// append board containers to main container
const gameBoardContainer = document.getElementById("gameboard-container");
gameBoardContainer.appendChild(playerBoardContainer);
gameBoardContainer.appendChild(computerBoardContainer);
