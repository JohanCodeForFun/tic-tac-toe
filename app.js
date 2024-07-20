const gameBoard = {
  loadBoard: function() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody")
    
    for (let i = 0; i < this.board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < this.board[i].length; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(this.board[i][j])
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

const player1 = {}
const player2 = {}

const actions = {
  placeMark: function() {
    console.log("hello")
  }
}
actions.placeMark()
console.log(gameBoard.board)