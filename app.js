const gameBoard = {
  loadBoard: function () {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < this.board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < this.board[i].length; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("-");
        cell.append(cellText);

        cell.addEventListener("click", () => {
          let cellContent = cell.textContent;

          if (cellContent !== "-") {
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
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ],
  winner: "",
  restart: function() {
    this.loadBoard 
  }
};

// function Player(name, marker) {
//   this.name = name;
//   this.marker = marker;
// }

// const player1 = new Player("Adam", "X");
// const player2 = new Player("Bob", "O");

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

