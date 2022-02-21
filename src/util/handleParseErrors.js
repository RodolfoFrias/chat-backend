module.exports = (error) => {
    if(error.code === Parse.Error.INVALID_SESSION_TOKEN) {
        return Parse.User.logOut()
    }
}