class LoginService {
    constructor({ redisService, logger }) {
        this.redis = redisService
        this.redisClient = null
        this.logger = logger()
    }

    async login (username) {
        await this.redis.setData(username, username)  
        return this.redis.getData(username) 
    }

}

module.exports = LoginService