const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express()//instancia de express

const server = http.createServer(app); //creando el server con http y express como handle request
const io = socketio(server); //iniciando el server de socket.io
const PORT = process.env.PORT || 9000;

//Conecting to database
mongoose.connect('mongodb://localhost/chat-sockets')
        .then(db => console.log('Database conected'))
        .catch(err => console.log(err));

//Importing routes
const iRoutes = require('./routes/index');
const errorController = require('./controllers/errors');

app.use(cors());
app.use(express.static(__dirname+'/cliente'));

app.set('views', path.join(__dirname,'cliente'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({entended:false}));

//Routes
app.use('/', iRoutes);
app.use(errorController.getError404);

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
    io.on('connection', (socket) => {
      console.log(`client: ${socket.id}`);

      socket.emit('mensaje', mensajes);

      socket.on('sendMensaje', (data) => {
        mensajes.push(data);
        io.sockets.emit('mensaje', mensajes);
      });

    });
});
