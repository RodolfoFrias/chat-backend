class UserController {
    constructor () {}

    user (req, res, next) {
        res.json('User')
    }

}

module.exports = UserController