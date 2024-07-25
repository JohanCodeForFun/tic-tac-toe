document.addEventListener("DOMContentLoaded", () => {
  const playerTurnDisplay = document.querySelector("#playerTurn");
  const gameBoard = {
    board: Array(3).fill().map(() => Array(3).fill("-")),
    currentPlayer: "X",
    togglePlayer() {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      playerTurnDisplay.innerHTML = `Player: ${this.currentPlayer}`;
    },
    checkWinner() {
      const b = this.board;
      const lines = [
        ...b, // Rows
        ...b[0].map((_, i) => b.map(row => row[i])), // Columns
        [b[0][0], b[1][1], b[2][2]], // Diagonal
        [b[0][2], b[1][1], b[2][0]] // Anti-diagonal
      ];
      for (let line of lines) {
        if (line.every(cell => cell === "X")) return win("X");
        if (line.every(cell => cell === "O")) return win("O");
      }
      return null;
    },
    loadBoard() {
      const tbl = document.createElement("table");
      tbl.setAttribute("border", "2");
      document.body.appendChild(tbl);
      this.board.forEach((row, i) => {
        const tr = tbl.insertRow();
        row.forEach((_, j) => {
          const cell = tr.insertCell();
          cell.textContent = "-";
          cell.addEventListener("click", () => {
            if (cell.textContent === "-") {
              cell.textContent = this.currentPlayer;
              this.board[i][j] = this.currentPlayer;
              if (this.checkWinner()) return;
              this.togglePlayer();
            }
          });
        });
      });
    }
  };

  function win(player) {
    alert(`Player ${player} wins!`);
  }

  gameBoard.loadBoard();
});