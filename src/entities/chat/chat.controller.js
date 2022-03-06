class ChatController {

    constructor (chatService) {
        this.chatService = chatService
    }

    async createChatRoom(req, res, next) {
        try {
            const { roomName } = req.body
            const roomCode = await this.chatService.createChatRoom(roomName)
            res.status(200).json({
                message: `Room created with code ${roomCode}`
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ChatController