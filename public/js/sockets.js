// object to store desktop sockets
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
export function setupSockets(realtimeListener) {
    let desktopSocket = null;
    const serverURL = window.location.hostname + ":" +  window.location.port;
    const realtimeListener = io.connect(serverURL, { secure: true });
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
