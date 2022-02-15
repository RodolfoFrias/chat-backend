const router = require('express').Router();
const LoginService = require('./login.service');
const LoginController = require('./login.controller');
const redisService = require('../services/RedisService')
const logger = require('../lib/logger')

const initRouter = (controller) => {
    router.get('/login', controller.login.bind(controller));
    return router;
}

module.exports = initRouter(
    new LoginController(new LoginService({
        redisService,
        logger
    }))
)