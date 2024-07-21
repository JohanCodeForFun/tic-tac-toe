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
          checkColumn()
          checkRows()
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

// const mark = (marker) => {
//   return marker
// }

const checkColumn = () => {
  for (let j = 0; j < gameBoard.board[0].length; j++) { // Iterate through each column
    let win = true;
    for (let i = 1; i < gameBoard.board.length; i++) { // Compare cells in the column
      if (gameBoard.board[i][j] !== gameBoard.board[i - 1][j] || gameBoard.board[i][j] === '' || gameBoard.board[i][j] === null) {
        win = false;
        break; // Break if any cell is not equal to the previous one or is empty/null
      }
    }
    if (win) {
      console.log("win")
      return true
    }; // If all cells in a column are identical and not empty/null, return true
  }
  return false; // Return false if no column meets the win condition
}

const checkRows = () => {
  for (let i = 0; i < gameBoard.board.length; i++) {
    if (gameBoard.board[i].every(x => x === "X")) {
      console.log("x wins")
      return "x wins"
    }
    
    if (gameBoard.board[i].every(o => o === "O")) {
      console.log("o wins")
      return "o wins"
    }
    console.log("no winner yet")
    return "no winner yet"
  }
}

let x = "";
let o = "";
const checkThreeInRow = (input) => {
  console.log("check", "input:",input, input === "X", input === "O")

  if (input === "X") {
    x += "X"
    console.log("add x", {input, x})
  } else {
    console.log("add o", {input, o})
    o += "O"
  }


  if (x.length === 3) {
    console.log("xxxx wins")
    return "x wins"
  }
  if (o.length === 3) {
    console.log("oooo wins")
    return "o wins"
  }
}