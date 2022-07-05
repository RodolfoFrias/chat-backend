class SocketServer {
    constructor ({ logger, socketio }) {
        this.io = null
        this.socketio = socketio
        this.logger = logger
    }

    start (httpServer) {
        this.io = this.socketio(httpServer, {
            cors: {
                origin: 'http://localhost:3000'
            }
        })
        this.logger.info(`Got socket ${this.io}`)
        return this.io
    }

    getIO () {
        if(!this.io) {
            throw new Error('Not socket initialized')
        }
        return this.io
    }

}

module.exports = SocketServer