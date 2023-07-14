class ChatController {

    async createChatRoom(req, res, next) {
        try {
            const chatService = req.scope.resolve('chatService')
            const { roomName } = req.body
            const roomCode = await chatService.createChatRoom(roomName)
            res.status(200).json({
                message: `Room created with code ${roomCode}`
            })
        } catch (error) {
            next(error)
        }
    }

    async getMessages(req, res, next) {
        try {
            const chatService = req.scope.resolve('chatService')
            const { room } = req.query
            const messages = await chatService.getMessages(room)
            res.status(200).json({messages: messages})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ChatController()