const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express()//instancia de express

const server = http.createServer(app); //creando el server con http y express como handle request
const io = socketio(server); //iniciando el server de socket.io
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.static('cliente'));

let mensajes = [
    {
        ID      : 1,
        nick    : "ChatBot",    
        mensaje : "Bienvenido al Chat, por favor deja algún comentarios"
    }
];

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
});

server.addListener('listening', () => {
    io.on('connection', function(socket){
      console.log(`client: ${socket.id}`);

      socket.emit('mensaje', mensajes);

      socket.on('sendMensaje', (data) => {
        mensajes.push(data);
        io.sockets.emit('mensaje', mensajes);
      });

    });
});
