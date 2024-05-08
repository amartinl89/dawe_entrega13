// object to store desktop sockets
// Importa socket.io y crea el servidor de Socket.IO
const io = require('socket.io');

// Crea el servidor de WebSocket
const realtimeListener = io();
export function setupSockets() {
    let desktopSocket = null;
    // the socket can be a phone or a desktop
    realtimeListener.on('connection', function (socket) {
        // receives a connect message from a desktop (for this example, we only have one yet)
        socket.on("desktop-connect", function () {
            console.log("Desktop Connected");
            desktopSocket = socket;
        });
        // receives a connect message from a phone
        socket.on("phone-connect", function () {
        console.log("Phone Connected");
        socket.desktop = false;
            if (desktopSocket) {
                // ... informs desktop that a phone has connected
                desktopSocket.emit('phone-connect');
            }
        });
        // receives a connect message from a phone
        socket.on("phone-move", function (data) {
            console.log("Phone moved:" + data.beta );
            if (desktopSocket)
                desktopSocket.emit('phone-move', data.beta);
        });
    });
}
