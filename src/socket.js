let io;

module.exports = {
    init : httpServer => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO : () => {
        if(!io){
            return new Error('Socket no inicializado');
        }
        return io;
    }
}