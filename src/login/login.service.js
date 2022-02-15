class LoginService {

    constructor({ redisService, logger }) {
        this.redis = redisService
        this.redisClient = null
        this.logger = logger
    }

    login (username) {
        let sucess = true
        try {
            this.redis.createClient()
            this.redis.set('username', username)   
        } catch (error) {
            this.logger.error(error)
            sucess = false
        }
        return sucess
    }

}

module.exports = LoginService