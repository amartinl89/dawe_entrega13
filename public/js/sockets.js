// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

export function setupSockets() {
    let desktopSocket = null;
    const socket = io.connect('https://dawe2024.me:3000');
    socket.on('connect', () => {
        console.log('Connected to server');
        
    });
};
