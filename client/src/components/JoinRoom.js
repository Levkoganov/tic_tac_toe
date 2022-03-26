import React,{useState, useContext} from 'react'
import { userContext } from "../context/UserContext"
import { socket } from '../socket/connect_socket'
import {joinGameRoom} from '../socket/game_socket'
import "./assets/joinRoom.css"

function JoinRoom() {
  const [roomName, setRoomName] = useState('1')
  const [isConnecting, setIsConnecting] = useState(false)
  const { setIsInRoom } = useContext(userContext);
  
  const handleRoomName = (e) => {
    const { value } = e.target;
    setRoomName(value);
  }

  const joinRoom = async (e) => {
    e.preventDefault();

    try { 
      // Check for iput errors
      if(!roomName || roomName.trim() === "" || !socket) {
        alert('Invalide Room ID'); return;
      } else {
        setIsConnecting(true) // user connection to server
      }
      
      // create Room
      const userJoined = joinGameRoom(socket, roomName);
      
      // connect user to room
      if(userJoined) {
        setIsInRoom(true); 
        console.log('inside room');
      } else {
        console.log('something went wrong');
      }
      
    } catch (error) {
      alert(`cannot join: ${error}`); console.log('JoinError:', error);
    }
    setIsConnecting(false); // set connecting stage to false
    setRoomName('') // clear input
  }

  return (
    <form onSubmit={joinRoom}>
      <div className='joinRoomContainer'>
          <h4 className='test'>Please enter room ID:</h4>
          
          <input 
            className='roomIdInput'
            type="text" 
            value={roomName}
            placeholder='Room Id'
            onChange={handleRoomName}
          />

          <button
            className='joinBtn'
            disabled={isConnecting}>
            {isConnecting ? 'joining...' : "join"}
          </button>
      </div>
    </form>
  )
}

export default JoinRoom

