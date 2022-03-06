class ChatService {

    constructor({ logger, socketService }) {
        this.logger = logger
        this.socketService = socketService
    }

    async createChatRoom(roomName) {
        return this.socketService.createChatRoom(roomName)
    }

}

module.exports = ChatService