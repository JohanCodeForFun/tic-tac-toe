const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const setBoard = (rowIndex, colIndex, content) => {
    if (rowIndex !== undefined && colIndex !== undefined) {
      board[rowIndex][colIndex] = content;
    }
  }

  const resetBoard = (newBoard) => {
    board = newBoard;
  }

  const render = () => {
    document.getElementById("add-player").style.display = "none";
    document.getElementById("playerTurn").style.display = "block";
    document.getElementById("restart").style.display = "block";

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tbl.setAttribute("border", "1");

    for (let i = 0; i < board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.append(cellText);

        cell.addEventListener("click", () => gameControls.handleCellClick(i, j, cell));

        row.append(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.append(tblBody);
    document.body.appendChild(tbl);
  };

  return {
    render,
    getBoard: () => board,
    resetBoard,
    setBoard,
  }
})();

const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    const player1 = document.querySelector("#player1").value;
    const player2 = document.querySelector("#player2").value;
    players = [
      gameControls.createPlayer(player1, "X"),
      gameControls.createPlayer(player2, "O"),
    ];

    currentPlayerIndex = 0;
    displayController.updatePlayerTurnDisplay(players, currentPlayerIndex);
    gameOver = false;

    gameBoard.render();
  };

  const restart = () => {
    displayController.resetBoard();
    gameBoard.render();

    currentPlayerIndex = 0;
    displayController.updatePlayerTurnDisplay(players, currentPlayerIndex)
  };

  const getNextPlayer = () => {
    const currentMark = players[currentPlayerIndex].mark;

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    displayController.updatePlayerTurnDisplay(players, currentPlayerIndex);
    
    return currentMark;
  }

  const checkWinner = (board) => {
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
    checkWinner,
    draw,
    win,
  };
})();

const displayController = (() => {
  const updatePlayerTurnDisplay = (players, currentPlayerIndex) => {
    const currentPlayer = players[currentPlayerIndex];
    document.querySelector("#playerTurn").innerHTML = `Player: ${currentPlayer.name} (${currentPlayer.mark})`;
  };

  const updateCell = (rowIndex, colIndex, content) => {
    gameBoard.setBoard(rowIndex, colIndex, content)
  };

  const resetBoard = () => {
    const existingTable = document.querySelector("table");
    if (existingTable) {
      document.body.removeChild(existingTable);
    }

    const board = gameBoard.getBoard()

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }

    gameBoard.resetBoard(board);
  };

  return {
    updateCell,
    updatePlayerTurnDisplay,
    resetBoard,
}})();

const gameControls = (() => {
  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    };
  };

  const handleCellClick = (i, j, cell) => {
    let cellContent = cell.textContent;

          if (cellContent !== "") {
            return;
          } else {
            cellContent = placeMark();
            cell.innerHTML = cellContent;

            displayController.updateCell(i, j, cellContent);
          }
          game.checkWinner(gameBoard.getBoard());
  }

  const placeMark = () => {
    return game.getNextPlayer();
  };

  return {
    createPlayer,
    handleCellClick,
  }
})();
