import React, {useContext} from 'react'
import { userContext } from '../context/UserContext';
import Game from './game/Game';
import JoinRoom from './JoinRoom';

function Main() {
  const { isInRoom } = useContext(userContext);
  
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