const { Server } = require("socket.io");
const  { getSocketGameRoom }  = require('./controller/getSocketRoom')

const socketServer = (Httpserver) => {

  const io = new Server(Httpserver, {cors: {
    origin: '*'
  }});
  // socket connection
  io.on('connection', (socket) => {
    console.log("users:", io.engine.clientsCount);

    // socket join room
    socket.on('join_game', async(message) => {

      const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
      const socketRooms = Array.from(socket.rooms.values()).filter((userID) => userID !== socket.id);
      if(socketRooms.length > 0) {
        socket.emit('joined_room_error', {
          error: 'Player can join only one room'
        });

      // check players
      } else if (connectedSockets && connectedSockets.size === 2) {
        socket.emit('joined_room_error', {
          error: 'room is full'
        });

      // connect into room
      } else {
        await socket.join(message.roomId);
        socket.emit('joined_room');
        console.log('New user join room:', message);

        if(io.sockets.adapter.rooms.get(message.roomId).size == 2) {
          socket.emit("start_game", {start: true, symbol: 'x'});
          socket.to(message.roomId).emit('start_game', {start: false, symbol: 'o'});
        }
      }
    })

    // render UI
    socket.on('update_game', (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_game_update", message);
    })

    // Set winner
    socket.on('game_win', (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_game_win", message);
    })

    // disconnect socket
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    })
  });
}

module.exports = {
  socketServer
}