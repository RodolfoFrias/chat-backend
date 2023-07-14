class ChatService {

    constructor({ logger, userService }) {
        this.logger = logger
        this.userService = userService
    }

    async getMessages(room) {
        return this.userService.getMessages(room)
    }

}

module.exports = ChatService