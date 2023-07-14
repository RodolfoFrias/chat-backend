class ChatService {

    constructor({ logger, redisService }) {
        this.logger = logger
        this.redisService = redisService
    }

    async getMessages(room) {
        let messages = await this.redisService.getData(room)
        messages = JSON.parse(messages)
        return messages ?? []
    }

    async saveMessage(room, message) {
        const currentMessages = await this.getMessages(room)
        currentMessages.push(message)
        await this.redisService.setData(room, JSON.stringify(currentMessages))
    }
}

module.exports = ChatService