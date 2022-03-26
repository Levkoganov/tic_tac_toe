import React,{useState} from 'react'

export const userContext = React.createContext();


export function UserContext({children}) {
    const [isInRoom , setIsInRoom] = useState(false);
    const [playerSymbol , setPlayerSymbol] = useState("x");
    const [isPlayerTurn , setIsPlayerTurn] = useState(false);
    const [isGameStarted , setIsGameStarted] = useState(false);

  return (
    <userContext.Provider
      value = {
       {
        isInRoom,
        playerSymbol,
        isPlayerTurn,
        isGameStarted,
        setPlayerSymbol,
        setIsInRoom,
        setIsPlayerTurn,
        setIsGameStarted
        }
      }>
        {children}
    </userContext.Provider>
  )
}