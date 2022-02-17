class LoginController {
    constructor (logger, loginService) {
        this.logger = logger()
        this.loginService = loginService
    }

    async login (req, res, next) {
        try {
            const resp = await this.loginService.login(req.body.username)
            res.status(200).json(resp)   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoginController