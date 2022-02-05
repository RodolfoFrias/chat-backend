const router = require('express').Router();
const UserService = require('./user.service');
const UserController = require('./user.controller');

const initRouter = (controller) => {
    router.get('/user', controller.user.bind(controller));
    return router;
}

module.exports = initRouter(
    new UserController(new UserService())
)