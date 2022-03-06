const router = require('express').Router()
const SessionService = require('./session.service')
const SessionController = require('./session.controller')
const RedisService = require('../../services/RedisService')
const logger = require('../../lib/logger')

// eslint-disable-next-line no-undef
const UserModel = Parse.Object.extend('_User')

const Router = (controller) => {
    router.post('/login', controller.login.bind(controller))
    router.post('/logout', controller.logout.bind(controller))
    return router
}

module.exports = Router(
    new SessionController(
        logger, 
        new SessionService({
            redisService: new RedisService({ logger }),
            logger: logger,
            userModel: UserModel
        })
    )
)