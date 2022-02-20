class LoginService {
    constructor({ redisService, logger, userModel }) {
        this.redis = redisService
        this.redisClient = null
        this.logger = logger()
        this.UserModel = userModel
    }

    async login ({ username, password }) {
        const userQuery = new Parse.Query('_User')
        userQuery.equalTo('username', username)
        const userFound = await userQuery.first()

        if(!userFound) {
            this.logger.info(`No user for ${username}, creating new user...`)
            return this._signup({ username, password })
        }

        return  Parse.User.logIn(username, password)
    }

    async _signup ({ username, password }) {
        const newUser = new this.UserModel()
        newUser.setUsername(username)
        newUser.setPassword(password)
        return newUser.signUp()
    }

}

module.exports = LoginService