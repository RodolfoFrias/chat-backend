class UserController {

    constructor (userService) {
        this.userService = userService
    }

    user (req, res) {
        res.json('User')
    }

}

module.exports = UserController