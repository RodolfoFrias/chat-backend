class UserService {

    constructor({ logger, redisService }) {
        this.logger = logger
        this.redisService = redisService
    }

    async setUser({ id, room }) {
        await this.redisService.setData(id, JSON.stringify({ id, room }))
    }

    async getUser(id) {
        return this.redisService.getData(id)
    }

    async getMessages(room) {
        return this.redisService.getData(room)
    }

    async saveMessage(room, message) {
        await this.redisService.setData(room, message)
    }

}

module.exports = UserService