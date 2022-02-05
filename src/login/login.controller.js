class LoginController {
    constructor () {}

    login (req, res, next) {
        res.render('login/login')
    }

}

module.exports = LoginController