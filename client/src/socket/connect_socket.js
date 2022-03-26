import { io } from "socket.io-client";
import serverUrl from "../config/serverUrl";

export const socket = io(serverUrl)

// Connect to server
export const connect_socket = () => {
  return new Promise((resolve, reject) => {
    
    if(!socket) {
      reject('something is wrong');
      return;

    } else {
      socket.on("connect", () => {
        resolve(socket); 
      })

      socket.on("connect_error", (err) => {
        reject(err)
      })
    }
  })
};

