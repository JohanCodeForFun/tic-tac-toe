const gameBoard = {
  loadBoard: function () {
    document.getElementById("add-player").style.display = "none";
    document.getElementById("restart").style.display = "block";

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < this.board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < this.board[i].length; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.append(cellText);

        cell.addEventListener("click", () => {
          let cellContent = cell.textContent;

          if (cellContent !== "") {
            return;
          } else {
            cellContent = actions.placeMark();
            cell.innerHTML = cellContent;

            gameBoard.board[i][j] = cellContent
            // checkThreeInRow(cellContent)
          }
          // game()
          // checkColumn()
          // checkRows()
          checkWinner(gameBoard.board);
          // console.log(checkWinner(gameBoard.board));
        });

        row.append(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.append(tblBody);
    document.body.appendChild(tbl);

    tbl.setAttribute("border", "2");
  },
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winner: "",
  gameOver: false,
  restart: function() {
    this.loadBoard 
  }
};

// - create new players
// - when start game is pressed, hide create player section.
// - display winning name when game over.

const createPlayer = (name, mark) => {
  return {
    name,
    mark
  }
}

const game = (() => {

})();

const actions = {
  playerTurn: 1,
  placeMark: function () {
    if (this.playerTurn === 1) {
      this.playerTurn++;
      playerTurn.innerHTML = "Player: " + actions.playerTurn;
      return "X";
    } else {
      this.playerTurn--;
      playerTurn.innerHTML = "Player: " + actions.playerTurn;
      return "O";
    }
  },
};

const playerTurn = document.querySelector("#playerTurn");
playerTurn.innerHTML = "Player: " + actions.playerTurn;

function win(player) {
  alert(`Player ${player} wins!`)
}

function checkWinner(board) {
  for (let row of board) {
    if (row.every(cell => cell === "X")) return win("X");
    if (row.every(cell => cell === "O")) return win("O");
  }

  for (let i = 0; i < board[0].length; i++) {
    if (board.every(col => col[i] === "X")) return win("X");
    if (board.every(col => col[i] === "O")) return win("O");
  }

  if (board.every((row, i) => row[i] === "X")) return win("X");
  if (board.every((row, i) => row[i] === "O")) return win("O");

  return "No winner yet";
}
