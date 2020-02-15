'use strict';

const Mensaje = require('../model/mensaje');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const io = require('../socket').getIO();

let mensajes = [ 
    {
        ID      : 1,
        nick    : 'ChatBot',    
        mensaje : 'Bienvenido al Chat, por favor deja algún comentario'
    }
];

io.on('connection', (socket) => {
    console.log(`client: ${socket.id}`);

    socket.emit('mensaje', mensajes);

    socket.on('sendMensaje', (data) => {
        mensajes.push(data);
        console.log('DATA:', mensajes);
        saveMensaje(data);
        io.sockets.emit('mensaje', mensajes);
    });
});

const saveMensaje = (mensajeIn) => {
    console.log(mensajeIn);
    const message = new Mensaje({
        content: mensajeIn.mensaje,
        user: mensajeIn.ID,
        date: new Date()
    });

    message.save()
        .then(() => {
            console.log('Saved!');
        }).catch(error => {
            console.log(error);
        });
}
