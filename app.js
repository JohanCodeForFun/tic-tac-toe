const gameBoard = {
  loadBoard: function() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody")
    
    for (let i = 0; i < this.board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < this.board[i].length; j++) {
        const cell = document.createElement("td");
        cell.addEventListener("click", () => {
          let cellContent = cellText.textContent
          cellContent = actions.placeMark(cellContent)
          cell.innerHTML = cellContent
        })

        const cellText = document.createTextNode("_")
      cell.append(cellText)
      row.append(cell)
      }

      tblBody.appendChild(row)
    }

    tbl.append(tblBody)
    document.body.appendChild(tbl)

    tbl.setAttribute("border", "2")
  },
  board: [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker
}

const player1 = new Player("Adam", "X")
const player2 = new Player("Bob", "O")

const actions = {
  playerTurn : 1,
  placeMark: function() {
    if (this.playerTurn === 1) {
      this.playerTurn++
      playerTurn.innerHTML = "Player: " + actions.playerTurn
      return "X"
    } else {
      this.playerTurn--
      playerTurn.innerHTML = "Player: " + actions.playerTurn
      return "O"
    }
  }
}

const playerTurn = document.querySelector("#playerTurn")
playerTurn.innerHTML = "Player: " + actions.playerTurn