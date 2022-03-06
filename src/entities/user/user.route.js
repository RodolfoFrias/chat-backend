const router = require('express').Router();
const UserService = require('./user.service');
const UserController = require('./user.controller');
const AwilixContainer = require('../../awilix')

const container = AwilixContainer()
const logger = container.resolve('logger')
const socketService = container.resolve('socketService')

const Router = (controller) => {
    router.get('/user', controller.user.bind(controller));
    return router;
}

module.exports = Router(
    new UserController(new UserService({ logger, socketService }))
)