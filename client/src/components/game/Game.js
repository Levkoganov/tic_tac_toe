import React,{useState, useContext, useEffect} from 'react'
import { gameWin, onGameUpdate, onGameWin, onStartGame, updateGame } from '../../socket/game_socket';
import { socket } from '../../socket/connect_socket';
import { userContext } from "../../context/UserContext"
import checkGameState from '../../config/win_algo';
import UserInfo from './UserInfo';
import GameBoard from './GameBoard';

//Style + CSS
import Cell from '../assets/style/cell';
import '../assets/game.css'


function Game() {
  const {
    playerSymbol,
    isPlayerTurn,
    isGameStarted,
    setIsPlayerTurn,
    setPlayerSymbol,
    setIsGameStarted
    } = useContext(userContext);

  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const updateGameBoard = (row, col, symbol) => {
    const newBoard = [...board]
    if(newBoard[row][col] === null){
      newBoard[row][col] = symbol;
      setBoard(newBoard);
    }

    if(socket) {
      updateGame(socket, newBoard)
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newBoard, playerSymbol)//DELETE

      if(currentPlayerWon && otherPlayerWon) {
        gameWin(socket, "Tie!");
        alert("Tie!");
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameWin(socket, "LOST!");
        alert("WON!")
      } else if (!currentPlayerWon && otherPlayerWon) {
        gameWin(socket, "LOST!");
        alert("WON!")
      }
      setIsPlayerTurn(false);
    }

  }

  useEffect(() => {
    const handleGameUpdate = () => {
      if(socket) {
        onGameUpdate(socket, (newBoard) => {
          setBoard(newBoard);
          setIsPlayerTurn(true);
          checkGameState(newBoard, playerSymbol)//DELETE
        })
      } else {
        console.log('update err');
      }
    }

    const handleGameStart = () => {
      if(socket) {
        onStartGame(socket, (options) => {
          setIsGameStarted(true);
          setPlayerSymbol(options.symbol);
          if (options.start) {
            setIsPlayerTurn(true);
          } else {
            setIsPlayerTurn(false);
          }
        })
      }
    }

    const handleGameWin = () => {
      if(socket) {
        onGameWin(socket, (message) => {
          setIsPlayerTurn(false)
          alert(message)
        })
      }
    }

    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  },[setIsPlayerTurn, setIsGameStarted, setPlayerSymbol, playerSymbol])

  // useEffect(() => {
  //   checkGameState(board, playerSymbol)
  // },[board, playerSymbol])

  return (
    <div className="gameContainer">
      <UserInfo 
      isPlayerTurn={isPlayerTurn} 
      isGameStarted={isGameStarted}
      playerSymbol={playerSymbol}
      />
      
      {board.map((row, rowIdx) => {
        return (
          <div className="rowContainer" key={rowIdx}>
            {row.map((col, colIdx) => (
              <Cell
                key={colIdx}
                borderRight={colIdx < 2}
                borderLeft={colIdx > 0}
                borderBottom={rowIdx < 2}
                borderTop={rowIdx > 0}
                onClick={() => updateGameBoard(rowIdx, colIdx, playerSymbol)}
              >
                <GameBoard col={col} />
              </Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Game