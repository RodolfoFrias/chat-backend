const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usuarios');

router.get('/', (req, res) => {
    res.render('login', info = {mensaje : ''});
});

router.get('/principal', (req, res) => {
    res.render('index');
});

router.get('/logout', (req, res) => {
    res.redirect('/');
});

router.get('/error', (req, res) => {
    res.render('login', info = {
        mensaje : 'Nickname ya usado'
    });    
});

router.post('/registro', usersController.postUsers);

module.exports = router;