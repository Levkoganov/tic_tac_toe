import React from 'react'

function UserInfo({isPlayerTurn, isGameStarted, playerSymbol}) {
  return (
    <div>
      {!isPlayerTurn ? (
        !isPlayerTurn && isGameStarted ? (
          <div>
            <h2>{`you play as: ${playerSymbol}`}</h2>
            <h2>waiting for oppnenet to play....</h2>
          </div>
        ) : null
      ) : (
        <div>
          <h2>{`you play as: ${playerSymbol}`}</h2>
          <h2>its your turn!....</h2>
        </div>
      )}
      {!isGameStarted && <h2>waiting for other player....</h2>}
      {(!isGameStarted || !isPlayerTurn) && <div className="playStopper" />}
    </div>
  );
}

export default UserInfo