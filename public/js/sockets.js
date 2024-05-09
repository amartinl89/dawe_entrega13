// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
let desktopSocket = null;
export function setupSockets() {
    const socket = io.connect('https://dawe2024.me:443');
    socket.on("desktop-connect", function () {
        console.log("Desktop Connected");
        // Almacenamos el socket del escritorio
        desktopSocket = socket;
    });

    // receives a connect message from a phone
    socket.on("phone-connect", function () {
        console.log("Phone Connected");
        // Cuando un teléfono se conecta, si hay un socket de escritorio disponible, se le informa al escritorio
        if (desktopSocket) {
            desktopSocket.emit('phone-connect');
        }
    });

    // receives a move message from a phone
    socket.on("phone-move", function (data) {
        console.log("Phone moved: " + data.beta);
        // Cuando un teléfono se mueve, se lo comunica al socket de escritorio, si existe
        if (desktopSocket) {
            desktopSocket.emit('phone-move', data.beta);
        }
    });
};
