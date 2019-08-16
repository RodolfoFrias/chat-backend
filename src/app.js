'use strict';

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const MONGO_URL =  'mongodb://localhost/chat-sockets';

const app = express()//instancia de express
const store = new MongoStore({
    uri: MONGO_URL,
    collection: 'sessions'
});

const server = http.createServer(app); //creando el server con http y express como handle request
const io = socketio(server); //iniciando el server de socket.io
const PORT = process.env.PORT || 9000;

//Importing routes
const iRoutes = require('./routes/routes');
const errorController = require('./controllers/errors');

app.set('views', path.join(__dirname,'cliente'));
app.set('view engine', 'ejs');

//Middlewares
app.use(cors());
app.use(express.static(__dirname+'/cliente'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({entended:false}));
app.use(session({
     secret: "el secreto de amor",
     resave: false, 
     saveUninitialized: false, 
     store: store
}));

app.use(flash());

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

//Conecting to database
mongoose
    .connect(MONGO_URL)
    .then(db => {
        console.log("Conected to database");

        server.listen(PORT, () => {
            console.log(`Server running in http://localhost:${PORT}`)
        });
    })
    .catch(err => console.log(err));

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
    