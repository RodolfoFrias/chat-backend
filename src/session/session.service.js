const handleParseErrors = require('../util/handleParseErrors')

class SessionService {
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

    async logout(username) {
        const user = await this._findUser(username)
        if(!user){
            this.logger.error(`User ${username} not found`)
            throw new Error('User not found')
        }
        const session = await this._findSession(user)
        if(session){
            return session.destroy(null, { useMasterKey: true })
        }
        return true
    }

    async _findSession(user) {
        try {
            const sessionQuery = new Parse.Query('_Session')
            sessionQuery.equalTo('user', user)
            const session = await sessionQuery.first()
            return session
        } catch (error) {
            return handleParseErrors(error)
        }
    }

    async _findUser(username) {
        const userQuery = new Parse.Query('_User')
        userQuery.equalTo('username', username)
        return userQuery.first()
    }

}

module.exports = SessionService