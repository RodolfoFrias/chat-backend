let io;
const logger = require('./logger')
module.exports = {
    init : httpServer => {
        logger.debug('Getting socket...')
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO : () => {
        if(!io){
            return new Error('Socket no inicializado');
        }
        logger.debug('Get socket io instance')
        return io;
    }
}