class LoginController {

    constructor (loginService) {
        this.loginService = loginService
    }

    login (req, res) {
        res.render('login/login')
    }

}

module.exports = LoginController