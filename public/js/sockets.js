// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const serverURL = window.location.hostname + ":" +  window.location.port;
export function setupSockets() {
    const socket = io.connect(serverURL, {secure: true});
    socket.emit('desktop-connect');
    return socket;
};
export function emitCrash(socket) {
    socket.emit('crash');
};
