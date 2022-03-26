import React, {useEffect, useContext} from 'react'
import { userContext } from '../context/UserContext';
import { connect_socket } from '../socket/connect_socket';
import Game from './game/Game';
import JoinRoom from './JoinRoom';

function Main() {
  const { isInRoom } = useContext(userContext);

  useEffect(() => (
    connect_socket()
  ),[]);

  return (
      <div className='appContainer'>
        <h1 className='mt-2 welcomeHeader'>Welcom to tic-tac-toe</h1>
        <section className='mainContainer'>
          {isInRoom ? <Game/> : <JoinRoom />} 
        </section>
      </div>
  )
}

export default Main