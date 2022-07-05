class SocketService {

    constructor ({ logger, socketServer }) {
        this.logger = logger
        this.socketServer = socketServer
        this.socket = null
    }

    connect () {
        this.logger.info('Connecting to socket...')
        this.socketServer.getIO().on('connection', (socket) => {
            this.socket = socket
            this.logger.info(`Socket connected ${socket.id}`)
            socket.on('message', (resp) => {
                console.log(resp)
                return true
            })
        })
    }

    connectToRoom() {
        this.socketServer.getIO().of((nsp, query, next) => {
           this.logger.info('Namespace: ',nsp, 'Query:',query);
            // Do your authentication or whatever here...
            next(null, true);            // If success

          }).on('connect', (socket) => {
            this.logger.info('Socket connected')
            this.socket = socket
          })
    }

    disconnect () {
        this.socketServer.getIO().on('disconnect', (reason) => {
            this.logger.info(reason);
            if (reason === 'io server disconnect') {
              this.socket.connect();
            }
        });
    }

    getSocket () {
        if(this.socket === undefined || this.socket == null){
            this.logger.error('Empty socket')
            return;
        }
        return socketio;
    }

    sendMessageToClient (event, description, id) {
        if(this.io){
            this.io.of(`/message/${id}`).emit(event, description);
        }
        this.logger.error('No socket initialized');
    }

    sendMessageToAllClient (event, description) {
        this.socketServer.getIO().sockets.emit(event, description);
    }

    createChatRoom (roomName) {
        this.socket.join(roomName)
    }
}

module.exports = SocketService