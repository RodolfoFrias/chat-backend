class UserController {

    constructor (userService) {
        this.userService = userService
    }

    user (req, res) {
        this.userService.send()
        res.json('User')
    }

}

module.exports = UserController