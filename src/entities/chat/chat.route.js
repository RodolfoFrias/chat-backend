const express = require('express');

const router = express.Router()
const ChatService = require('./chat.service');
const ChatController = require('./chat.controller');

const AwilixContainer = require('../../awilix')

const container = AwilixContainer()
const logger = container.resolve('logger')
const socketService = container.resolve('socketService')

const Router = (controller) => {
    router.post('/create-chat', controller.user.bind(controller));
    return router;
}

module.exports = Router(
    new ChatController(new ChatService({ logger, socketService }))
)