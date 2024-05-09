// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

export function setupSockets() {
    const socket = io.connect('https://dawe2024.me:443');
    socket.on('connect', () => {
        socket.emit('Connected to server');
        
    });
};
