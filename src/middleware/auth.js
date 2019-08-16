module.exports = (req, res, next) => {
    console.log('Session is: '+req.session.isLoggedIn);
    if(!req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

