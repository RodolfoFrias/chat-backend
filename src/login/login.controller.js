class LoginController {
    constructor (logger, loginService) {
        this.logger = logger()
        this.loginService = loginService
    }

    async login (req, res, next) {
        try {
            const { username, password } = req.body
            const resp = await this.loginService.login({ username, password })
            res.status(200).json(resp)   
        } catch (error) {
            next(error)
        }
    }

    async signup (req, res, next ) {
        try {
            const { username, password } = req.body
            const resp = await this.loginService.signup({ username, password })
            res.status(200).json(resp)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoginController