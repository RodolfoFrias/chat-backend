'use strict';

const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const user = require('../model/usuario');

const usersController = require('../controllers/usuarios');
const isAuth = require('../middleware/auth');

router.get('/', usersController.getIndex );

router.post('/login', usersController.postUsers);

router.get('/principal',isAuth, usersController.getPrincipal);

router.get('/register', usersController.getRegister);

router.post('/signup',
    [check('email').isEmail().normalizeEmail().withMessage('Correo inválido').custom((value, { req }) => {
        return user.findOne({email: value}).then(result => {
            if(result){
                return Promise.reject(
                    'Este correo ya ha sido utilizado, introduzca otro por favor'
                );
            }
        });
    }),
     body('usuario').isAlphanumeric().trim().withMessage('Solo letras y números para el usuario'), 
     body('password').isLength({ min: 8 }).withMessage('La contraseña es minima de 8 caracteres'),
     body('repassword').custom((value, { req }) => {
        if (value !== req.body.password){
            throw new Error('Las contraseñas no coiciden')
        }
        return true;
    })] ,
    usersController.postRegister);

router.get('/error', usersController.getError);

router.get('/success', usersController.getSuccess);

router.post('/logout', usersController.postLogout);

router.get('/home',isAuth , usersController.getHome);

router.get('/users', usersController.getUsers);

module.exports = router;