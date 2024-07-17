import Player from "./player";
import Ship from "./ship";
import "./style.css";

const player = new Player("Player");
const computer = new Player("Computer");
let gameOver = false;

// function makes board based on player's gameboard
function makeGameboardCells(player, container, enemy = false) {
  player.gameboard.board.forEach((ele, i) => {
    let row = document.createElement("div");
    row.classList.add("row");
    ele.forEach((ele, j) => {
      let col = document.createElement("div");
      row.appendChild(col);
      addCellClass(col, i, j, enemy, computer);
      if (!enemy && ele) {
        col.classList.add("ship-cell");
      }
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
      const result = enemyName.gameboard.receiveAttack([a, b]);
      if (result == "Hit" || result == "Sunk") {
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
    if (player.gameboard.receiveAttack([row, col]) === "Hit") {
      div.classList.add("hit-ship");
    } else {
      div.classList.add("hit");
    }
  }
}
// check if all the ships are sunk
function checkShipSunk(player) {
  const ships = player.ships;
  let sunkCount = 0;
  const numShips = 5;

  for (const shipName in ships) {
    const ship = ships[shipName];
    if (ship.sunk) {
      sunkCount++;
    }
  }

  if (sunkCount === numShips) {
    document.querySelector("dialog").className = "show";
    const result = document.querySelector("#showWinner");
    result.innerHTML = `${player.name} won, Go again?`;
    result.style.display = "block";
    // generate ships for both player
    makeDefaultShip(player);
    makeDefaultShip(computer);
    gameOver = true; // Set game over flag
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
    while (place !== "Placed") {
      row = randomNumber(10);
      col = randomNumber(10);
      vertical = randomNumber(2) === 0;
      place = player.gameboard.place(player.ships[ship], [row, col], vertical);
    }
  }
}
// if going against computer -> checkShipSunk and computerTurn
function otherPlayersTurn() {
  checkShipSunk(player);
  computerTurn();
  checkShipSunk(computer);
}
// check if input value are valid
document.querySelector("#startGame").addEventListener("click", (event) => {
  event.preventDefault();
  const form = document.getElementById("shipForm");
  const isValid = form.checkValidity();

  if (isValid) {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => (error.textContent = ""));

    if (placePlayerShip()) {
      document.querySelector("dialog").classList.add("hide");
    }
  } else {
    const inputs = form.querySelectorAll("input:required");
    inputs.forEach((input) => {
      const errorSpan = input.parentNode.querySelector(".error");
      if (errorSpan) {
        if (input.validity.valueMissing) {
          errorSpan.textContent = "This field is required.";
        } else {
          errorSpan.textContent = "";
        }
      }
    });
  }
});
// place ship in player's board and return boolean
function placePlayerShip() {
  let isValid = true;

  for (const ship in player.ships) {
    const liElement = document.querySelector(`#${ship}-input`);
    if (liElement) {
      const inputs = liElement.getElementsByTagName("input");
      const dropdown = liElement.getElementsByTagName("select")[0].value;
      if (inputs.length >= 2) {
        const firstInput = parseInt(inputs[0].value, 10);
        const secondInput = parseInt(inputs[1].value, 10);

        const place = player.gameboard.place(
          player.ships[ship],
          [firstInput, secondInput],
          dropdown
        );
        if (place === "Placed") {
          const errorSpan = liElement.querySelector(".error");
          errorSpan.textContent = "";
          highlightPlayerShips();
        } else {
          isValid = false;
          const errorSpan = liElement.querySelector(".error");
          if (errorSpan) {
            errorSpan.textContent = `Cannot place ${ship} at the specified location.`;
          }
        }
      }
    }
  }

  return isValid;
}
// Function to highlight player's ships on the board
function highlightPlayerShips() {
  for (let ship in player.ships) {
    const shipInstance = player.ships[ship];
    player.gameboard.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === shipInstance) {
          const cellElement = playerBoardContainer.querySelector(
            `.row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`
          );
          if (cellElement) {
            cellElement.classList.add("ship-cell");
          }
        }
      });
    });
  }
}
document.querySelector("#resetGame").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#showWinner").style.display = "none";
  const dialog = document.querySelector("dialog");
  dialog.querySelector("form").reset();

  player.gameboard.board = player.gameboard.buildBoard();
  computer.gameboard.board = computer.gameboard.buildBoard();
  dialog.className = "show";

  playerBoardContainer.innerHTML = "";
  computerBoardContainer.innerHTML = "";

  makeGameboardCells(player, playerBoardContainer);
  makeGameboardCells(computer, computerBoardContainer, true);

  // generate ships for both player
  makeDefaultShip(player);
  makeDefaultShip(computer);

  randomlyPlaceShip(computer);
});

document.querySelector("#randomBoard").addEventListener("click", (event) => {
  event.preventDefault();
  gameOver = false; // Reset game over flag
  const dialog = document.querySelector("dialog");
  dialog.querySelector("form").reset();

  player.gameboard.board = player.gameboard.buildBoard();
  computer.gameboard.board = computer.gameboard.buildBoard();

  playerBoardContainer.innerHTML = "";
  computerBoardContainer.innerHTML = "";

  makeGameboardCells(player, playerBoardContainer);
  makeGameboardCells(computer, computerBoardContainer, true);
  randomlyPlaceShip(computer);
  randomlyPlaceShip(player);

  highlightPlayerShips();

  dialog.className = "hide";
});

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
