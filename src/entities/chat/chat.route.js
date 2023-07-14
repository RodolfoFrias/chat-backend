const express = require('express');

const router = express.Router()

const chatController = require('./chat.controller')

router.post('/create-chat', chatController.createChatRoom);
router.get('/get-messages', chatController.getMessages)

module.exports = router