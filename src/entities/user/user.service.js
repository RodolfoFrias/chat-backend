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

}

module.exports = UserService