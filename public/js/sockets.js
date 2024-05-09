// sockets.js
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
let desktopSocket = null;
export function setupSockets() {
    const socket = io.connect('https://dawe2024.me:443');
    socket.on('connect', () => {
        socket.on("desktop-connect", function () {
            console.log("Desktop Connected");
            desktopSocket = socket;
        });
    
        // receives a connect message from a phone
        socket.on("phone-connect", function () {
            console.log("Phone Connected");
            if (desktopSocket) {
                desktopSocket.emit('phone-connect');
            }
        });
    
        // receives a move message from a phone
        socket.on("phone-move", function (data) {
            console.log("Phone moved: " + data.beta);
            if (desktopSocket) {
                desktopSocket.emit('phone-move', data.beta);
            }
        });
    });
    var update = function(id, value) {
        if (value) {
            value = Math.floor(value);
            var rotate = 'rotate' + id.toUpperCase() + '(' + (id === 'x' ? -value : value )+ 'deg)';

            id = '#' + id;
            $(id).html(value + '&deg;');

            id += '-icon';
            $(id).css('transform', rotate);
            $(id).css('-webkit-transform', rotate);
        }
    };

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e) {

            socket.emit('phone-move', { alpha: e.alpha, beta: e.beta, gamma: e.gamma});

            $('#frame').text((e.absolute ? 'Earth' : 'arbitrary') + ' coordinates frame');

            update('x', e.beta);
            update('y', e.gamma);
            update('z', e.alpha ? 360 - e.alpha : null);
        });
    }
};
