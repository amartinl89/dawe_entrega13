// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const serverURL = window.location.hostname + ":" +  window.location.port;
export function setupSockets() {
    const socket = io.connect(serverURL, {secure: true});
    // socket.on('connect', () => {
    //     socket.on("desktop-connect", function () {
    //         console.log("Desktop Connected");
    //         desktopSocket = socket;
    //     });
    
    //     // receives a connect message from a phone
    //     socket.on("phone-connect", function () {
    //         console.log("Phone Connected");
    //         if (desktopSocket) {
    //             desktopSocket.emit('phone-connect');
    //         }
    //     });
    
    //     // receives a move message from a phone
    //     socket.on("phone-move", function (data) {
    //         console.log("Phone moved: " + data.beta);
    //         if (desktopSocket) {
    //             desktopSocket.emit('phone-move', data.beta);
    //         }
    //     });
    // });
    socket.emit('desktop-connect');
    return socket;
};
