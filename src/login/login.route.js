const router = require('express').Router()
const LoginService = require('./login.service')
const LoginController = require('./login.controller')
const RedisService = require('../services/RedisService')
const logger = require('../lib/logger')

const initRouter = (controller) => {
    router.post('/login', controller.login.bind(controller))
    return router
}

module.exports = initRouter(
    new LoginController(
        logger, 
        new LoginService({
            redisService: new RedisService({ logger }),
            logger
        })
    )
)