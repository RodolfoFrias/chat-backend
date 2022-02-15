class LoginController {

    constructor (loginService) {
        this.loginService = loginService
    }

    login (req, res) {
        this.login(req.body.username)
    }

}

module.exports = LoginController