class LoginController {
    constructor (logger, loginService) {
        this.logger = logger()
        this.loginService = loginService
    }

    async login (req, res, next) {
        try {
            console.log(req.body)
            this.logger.info(`Receiving body: ${req.body}`)
            const { username, password } = req.body
            const resp = await this.loginService.login({ username, password })
            res.status(200).json(resp)   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoginController