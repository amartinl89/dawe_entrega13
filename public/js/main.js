import {setupSockets} from "./sockets.js";
let spritesheet;
let socket;

window.onload = () => {
     socket = setupSockets();
     console.log(socket);
     // Manejar el evento 'phone-move' para recibir los datos de ángulo de inclinación
     socket.on('phone-move', (data) => {
        // Extraer el ángulo de inclinación en el eje beta
        const angulo = data;

        // Mover la ventana deslizante en función del ángulo recibido
        if (angulo < 0) {
            // Mover hacia la izquierda
            moverVentana({ key: 'ArrowLeft' });
//            simulateKeyEvent('ArrowLeft');
        } else if (angulo > 0) {
            // Mover hacia la derecha
            moverVentana({ key: 'ArrowRight' });
            //simulateKeyEvent('ArrowRight');

        } else {
        // No hacer nada (mantener la ventana en su posición actual)
        }
    });
    dibujarCanvas();
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
 console.log("entra");
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
            }else{
                socket.emit('crash');
            }
            break;
        case 'ArrowRight':
            if (ventana.x + ventana.width + ventana.speed <= spritesheet.width) {
                ventana.x += ventana.speed;
            }else{
                socket.emit('crash');
            }
            break;
    }


    dibujarCanvas();

    zoomIn();
}

function simulateKeyEvent(key) {
    // Simular evento de teclado de pulsación de tecla
    document.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
    // Simular evento de teclado de liberación de tecla (levantar el dedo)
    document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
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



