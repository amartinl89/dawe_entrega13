// sockets.js

export function setupSockets(realtimeListener) {
    let desktopSocket = null;

    realtimeListener.on('connection', (socket) => {
        // Tu lógica para manejar la conexión de los sockets aquí
    });
};
