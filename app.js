const gameBoard = {
  render: function () {
    document.getElementById("add-player").style.display = "none";
    document.getElementById("playerTurn").style.display = "block";
    document.getElementById("restart").style.display = "block";

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tbl.setAttribute("border", "2");

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
            cellContent = gameControls.placeMark();
            cell.innerHTML = cellContent;

            gameBoard.board[i][j] = cellContent;
          }
          checkWinner(gameBoard.board);
        });

        row.append(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.append(tblBody);
    document.body.appendChild(tbl);
  },
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    const player1 = document.querySelector("#player1").value;
    const player2 = document.querySelector("#player2").value;
    players = [
      createPlayer(player1, "X"),
      createPlayer(player2, "O"),
    ];

    currentPlayerIndex = 0;
    updatePlayerTurnDisplay();
    gameOver = false;

    gameBoard.render();
  };

  const updatePlayerTurnDisplay = () => {
    const currentPlayer = players[currentPlayerIndex];
    document.querySelector("#playerTurn").innerHTML = `Player: ${currentPlayer.name} (${currentPlayer.mark})`;
  };

  const restart = () => {
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    gameBoard.render();

    updatePlayerTurnDisplay();
  };

  const getNextPlayer = () => {
    const currentMark = players[currentPlayerIndex].mark;

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updatePlayerTurnDisplay();
    
    return currentMark;
  }

  const draw = () => {
    gameOver = true;

    const squares = document.querySelectorAll("td");

    squares.forEach(square  => {
      square.style.pointerEvents = "none";
    })
    
    document.querySelector("#playerTurn").innerHTML = "It's a draw!"
  }

  const win = () => {
    gameOver = true;

    const squares = document.querySelectorAll("td");

    squares.forEach(square => {
      square.style.pointerEvents = "none";
    });

    const previousPlayerIndex = currentPlayerIndex === 1 ? 0 : 1; 
    document.querySelector("#playerTurn").innerHTML = `Player ${players[previousPlayerIndex].name} (${players[previousPlayerIndex].mark}) wins!`

    return;
  }

  return {
    start,
    restart,
    getNextPlayer,
    draw,
    win,
  };
})();

const gameControls = (() => {
  const placeMark = () => {
    return game.getNextPlayer();
  };

  return {
    placeMark,
  }
})();

function checkWinner(board) {
  for (let row of board) {
    if (row.every((cell) => cell === "X")) return game.win("X");
    if (row.every((cell) => cell === "O")) return game.win("O");
  }

  for (let i = 0; i < board[0].length; i++) {
    if (board.every((col) => col[i] === "X")) return game.win("X");
    if (board.every((col) => col[i] === "O")) return game.win("O");
  }
  for (let i = board[0].length; i > 0; i--) {
    if (board.every((col) => col[i] === "X")) return game.win("X");
    if (board.every((col) => col[i] === "O")) return game.win("O");
  }

  if (board.every((row, i) => row[i] === "X")) return game.win("X");
  if (board.every((row, i) => row[board.length - 1 - i] === "X")) return game.win("X");
  if (board.every((row, i) => row[board.length - 1 - i] === "O")) return game.win("O");
  if (board.every((row, i) => row[i] === "O")) return game.win("O");

  if (board.flat().every(cell => cell === "X" || cell === "O")) return game.draw();

  return "No winner yet";
}
