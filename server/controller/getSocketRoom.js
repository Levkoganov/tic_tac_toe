const getSocketGameRoom = (socket) => {
  const socketRooms = Array.from(socket.rooms.values()).filter((roomID) => roomID !== socket.id)
  const gameRoom = socketRooms && socketRooms[0];

  return gameRoom;
}

module.exports = {
  getSocketGameRoom
}