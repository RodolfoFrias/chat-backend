'use strict'

exports.getError404 = (req, res) => {
    res.status(404).render('404');
};