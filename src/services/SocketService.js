class SocketService {

    constructor ({ logger, socketServer, userService }) {
        this.logger = logger
        this.socketServer = socketServer
        this.socket = null
        this.userService = userService
    }

    connect () {
        this.logger.info('Connecting to socket...')
        const io = this.socketServer.getIO()
        io.on('connection', (socket) => {
            this.socket = socket
            this.logger.info(`Socket connected ${socket.id}`)
            socket.on('joinMainRoom', async ({ room }) => {
               await this.userService.setUser({
                  id: socket.id,
                  room: room
               })
               socket.join(room)
            })
            socket.on('chatMessage', async (message) => {
                const userInfo = await this.userService.getUser(socket.id)
                const { id, room } = JSON.parse(userInfo)
                io.to(room).emit('message', message)
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