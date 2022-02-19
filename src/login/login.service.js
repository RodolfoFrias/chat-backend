class LoginService {
    constructor({ redisService, logger, userModel }) {
        this.redis = redisService
        this.redisClient = null
        this.logger = logger()
        this.UserModel = userModel
    }

    async login ({ username, password}) {
        await Parse.User.logIn(username, password)
    }

    async signup ({ username, password }) {
        const newUser = new this.UserModel()
        newUser.setUsername(username)
        newUser.setPassword(password)
        return newUser.signUp()
    }

}

module.exports = LoginService