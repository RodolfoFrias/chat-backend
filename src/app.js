'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost/chat-sockets';

const app = express()//instancia de express
const store = new MongoStore({
    uri: MONGO_URL,
    collection: 'sessions'
});

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

//Conecting to database
mongoose
    .connect(MONGO_URL)
    .then(db => {
        console.log("Conected to database");

        const server = app.listen(PORT, () => {
            console.log(`Server running in http://192.168.0.14:${PORT}`)
        });
        require('./socket').init(server);
        require('./controllers/mensajes');
    })
    .catch(err => {
        throw new Error('Error al conectar a la base de datos')
    });
