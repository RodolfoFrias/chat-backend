const io = require('../lib/socketServer').getIO()
const logger = require('../lib/logger')
const messages = [ 
    {
        ID      : 1,
        nick    : 'ChatBot',    
        mensaje : 'Welcomen to the Chat, please leave a message'
    }
];

const onMessage = (data) => {
    messages.push(data)
    io.sockets.emit('message', mensajes);
}

io.on('connection', (socket) => {
    logger.info(`client: ${socket.id}`);

    socket.emit('mensaje', mensajes);

    socket.on('message', onMessage(data, io));
});
