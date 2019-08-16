'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usuarios');
const isAuth = require('../middleware/auth');

router.get('/', usersController.getIndex );

router.post('/login', usersController.postUsers);

router.get('/principal',isAuth, usersController.getPrincipal);

router.get('/register', usersController.getRegister);

router.post('/signup', usersController.postRegister);

router.get('/error', usersController.getError);

router.get('/success', usersController.getSuccess);

router.post('/logout', usersController.postLogout);


module.exports = router;