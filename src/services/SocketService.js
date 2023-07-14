class SocketService {

    constructor ({ logger, socketServer, userService, chatService }) {
        this.logger = logger
        this.socketServer = socketServer
        this.userService = userService
        this.chatService = chatService
        this.socket = null
        this.io = null
    }

    connect () {
        this.logger.info('Connecting to socket...')
        this.io = this.socketServer.getIO()
        this.io.on('connection', this.#onConnection.bind(this))
    }

    #onConnection(socket) {
        this.logger.info(`Socket connected ${socket.id}`)
        this.socket = socket
        socket.on('joinMainRoom', this.#onJoinRoom.bind(this))
        socket.on('chatMessage', this.#onChatMessage.bind(this))
        socket.on('disconnect', this.#onDisconnect.bind(this))
    }

    async #onJoinRoom({ room }) {
        await this.userService.setUser({
            id: this.socket.id,
            room: room
         })
         this.socket.join(room)
    }

    async #onChatMessage(message) {
        const userInfo = await this.userService.getUser(this.socket.id)
        const { id, room } = JSON.parse(userInfo)
        await this.chatService.saveMessage(room, message)
        this.io.to(room).emit('newMessage')
    }

    #onDisconnect (reason) {
        this.logger.info(`Disconnecting: ${reason}`);
        if (reason === 'io server disconnect') {
          this.socket.connect();
        }
    }
}

module.exports = SocketService