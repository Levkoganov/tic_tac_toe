import React from 'react'

function GameBoard({col}) {
  return (
    <div>
      {col && col !== "null" ? (
        col === "x" ? (
          <span className="x" />
        ) : (
          <span className="o" />
        )
      ) : null}
    </div>
  );
}

export default GameBoard