
export const joinGameRoom = (socket, roomId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      socket.emit('join_game', { roomId }) 
      socket.on("joined_room", () => resolve(true))
      socket.on("joined_room_error", ({ error }) => reject(error))
    },1000)
  })

}

export const updateGame = (socket, gameBoard) => {
  socket.emit("update_game", {board: gameBoard})
}

export const onStartGame = async(socket, listener) => {
  socket.on('start_game', listener)
}
export const onGameUpdate = (socket, listener) => {
  socket.on("on_game_update", (
    {board}) => {listener(board)})
}

export const gameWin = async(socket, message) => {
  socket.emit('game_win', {message})
}
export const onGameWin = async(socket, listener) => {
  socket.on("on_game_win", ({message}) => listener(message))
}
