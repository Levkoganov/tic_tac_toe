const checkGameState = (board, playerSymbol) => {
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push(board[i][j]);
    }

    if (row.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (row.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  for (let i = 0; i < board.length; i++) {
    let column = [];
    for (let j = 0; j < board[i].length; j++) {
      column.push(board[j][i]);
    }

    if (column.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (column.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  if (board[1][1]) {
    if (board[0][0] === board[1][1] && board[2][2] === board[1][1]) {
      if (board[1][1] === playerSymbol) {
        return [true, false];
      }
      else {
        return [false, true];
      }
    }

    if (board[2][0] === board[1][1] && board[0][2] === board[1][1]) {
      if (board[1][1] === playerSymbol) {
       return [true, false];
      }
      else{
        return [false, true];
      }
    }
  }

  //Check for a tie
  if (board.every((m) => m.every((v) => v !== null))) {
    alert('Tie');
    return [true, true];
  }

  return [false, false];
};

export default checkGameState;