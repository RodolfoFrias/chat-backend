class UserService {

    constructor({ logger, socketService }) {
        this.logger = logger
        this.socketService = socketService
    }

    user () {
        return true
    }

    send () {
        this.socketService.sendMessageToAllClient('message', 'Hey buddy!')
    }

}

module.exports = UserService