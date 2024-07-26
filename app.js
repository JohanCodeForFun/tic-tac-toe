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
   const size = board.length;
   let emptyFound = false;
   let diag1 = { X: 0, O: 0 };
   let diag2 = { X: 0, O: 0 };
   
   for (let i = 0; i < size; i++) {
     let row = { X: 0, O: 0 };
     let col = { X: 0, O: 0 };

     for (let j = 0; j < size; j++) {
       row[board[i][j]]++;
       col[board[j][i]]++;
      if (board[i][j] === "") emptyFound = true;
     }

     // Diagonal checks
     diag1[board[i][i]]++;
     diag2[board[i][size - i - 1]]++;

     // Check for win in row or column
     if (row["X"] === size || col["X"] === size) return game.win("X")
      if (row["O"] === size || col["O"] === size) return game.win("O")
      }
    
      // Check for win in diagonal
      if (diag1["X"] === size || diag2["X"] === size) return game.win("X")
      if (diag1["O"] === size || diag2["O"] === size) return game.win("O")

      if (!emptyFound) return game.draw();
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
