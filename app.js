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
          game()
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
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const player1 = new Player("Adam", "X");
const player2 = new Player("Bob", "O");

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


const game = () => {
  if (gameBoard.board[0].every(x => x === "X")) {
    console.log("first: x won")
  } else if (gameBoard.board[0].every(x => x === "O")) {
    console.log("second: o won")
  } else if (gameBoard.board[1].every(x => x === "X")) {
    console.log("third: x won")
  } else if (gameBoard.board[1].every(x => x === "O")) {
    console.log("fourth: o won")
  } else if (gameBoard.board[2].every(x => x === "X")) {
    console.log("fifth: x won")
  } else if (gameBoard.board[2].every(x => x === "O")) {
    console.log("sixth: o won")
  } else if /* columns */ (gameBoard.board[0][0] === "X" && gameBoard.board[1][0] === "X" && gameBoard.board[2][0] === "X") {
    console.log("seventh: x won")
  } else if (gameBoard.board[0][1] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[2][1] === "X") {
    console.log("eigth: x won")
  } else if (gameBoard.board[0][2] === "X" && gameBoard.board[1][2] === "X" && gameBoard.board[2][2] === "X") {
    console.log("seventh: x won")
  } else if (gameBoard.board[0][0] === "O" && gameBoard.board[1][0] === "O" && gameBoard.board[2][0] === "O") {
    console.log("seventh: o won")
  } else if (gameBoard.board[0][1] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][1] === "O") {
    console.log("seventh: o won")
  } else if (gameBoard.board[0][2] === "O" && gameBoard.board[1][2] === "O" && gameBoard.board[2][2] === "O") {
    console.log("seventh: o won")
  } /* diagnoal */ else if (gameBoard.board[0][0] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[2][2] === "X") {
    console.log("seventh: x won")
  } else if (gameBoard.board[2][2] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[0][2] === "X") {
    console.log("seventh: x won")
  } else if (gameBoard.board[0][0] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][2] === "O") {
    console.log("seventh: x won")
  } else if (gameBoard.board[2][2] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][0] === "O") {
    console.log("seventh: o won")
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