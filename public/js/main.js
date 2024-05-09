import {setupSockets} from "./sockets.js";
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
let spritesheet;
const serverURL = window.location.hostname + ":" +  window.location.port;

window.onload = () => {
   if (window.location.pathname !== '/dawe_entrega13/movil') {
	 dibujarCanvas();
     const socket = io.connect(serverURL, { secure: true });
     setupSockets(socket);
	socket.emit('desktop-connect')
   }else{
	const socket = io.connect(serverURL, {secure: true})
    // register phone connection
    setupSockets(socket);
    socket.emit('phone-connect');
    socket.on('crash', function() {
        navigator.vibrate(500);
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
}
};   

const ventana = {
    x: 0,
    y: 0,
    width: 25,
    height: 35,
    speed: 5
};

function dibujarCanvas() {
    var canvas = document.getElementById("lienzo");
    var context = canvas.getContext("2d");
    spritesheet = new Image();

    spritesheet.addEventListener('load', function() {
        context.drawImage(spritesheet, 0, 0); // imagen y coordenadas de posicion
        zoomIn(ventana.x, ventana.y, ventana.width, ventana.height, 490, 10);
        dibujarVentana();
        mostrarPosicionVentana(context);
    });

    spritesheet.src = "/dawe_entrega13/public/images/spritesheet.png";
}

function mostrarPosicionVentana(context) {
    context.fillStyle = "black";
    context.font = "10px Arial";
    context.fillText("(" + ventana.x + ", " + ventana.y + ")", spritesheet.width - 45, 10);
}

function dibujarVentana() {
    var canvas = document.getElementById("lienzo");
    var context = canvas.getContext("2d");

    // Dibujar la ventana deslizante
    context.strokeStyle = "red";
    context.strokeRect(ventana.x, ventana.y, ventana.width, ventana.height);
    context.scale(1, 1);
    // Agregar el evento de teclado para mover la ventana
    window.addEventListener('keydown', moverVentana);
}

function moverVentana(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (ventana.y - ventana.speed >= 0) {
                ventana.y -= ventana.speed;
            }
            break;
        case 'ArrowDown':
            if (ventana.y + ventana.height + ventana.speed <= spritesheet.height) {
                ventana.y += ventana.speed;
            }
            break;
        case 'ArrowLeft':
            if (ventana.x - ventana.speed >= 0) {
                ventana.x -= ventana.speed;
            }
            break;
        case 'ArrowRight':
            if (ventana.x + ventana.width + ventana.speed <= spritesheet.width) {
                ventana.x += ventana.speed;
            }
            break;
    }

 
    dibujarCanvas();
    
    zoomIn();
}

function zoomIn(srcX, srcY, srcWidth, srcHeight, destX, destY) {
    var canvas = document.getElementById("lienzo");
    var context = canvas.getContext("2d");

    var zoomFactor = 2; 

    context.drawImage(
        canvas,
        srcX, srcY, srcWidth, srcHeight,
        destX, destY, srcWidth * zoomFactor, srcHeight * zoomFactor
    );
}


