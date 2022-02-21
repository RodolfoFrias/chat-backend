class SessionController {
    constructor (logger, sessionService) {
        this.logger = logger()
        this.sessionService = sessionService
    }

    async login (req, res, next) {
        try {
            this.logger.info(`Receiving body: ${req.body}`)
            const { username, password } = req.body
            const resp = await this.sessionService.login({ username, password })
            res.status(200).json(resp)   
        } catch (error) {
            next(error)
        }
    }

    async logout (req, res, next) {
        try {
            const { username } = req.body
            const resp = await this.sessionService.logout(username)
            res.status(200).json(resp)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = SessionController