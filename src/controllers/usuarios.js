'use strict'

const User = require('../model/usuario');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.getIndex = (req, res) => {
    res.render('login', {mensaje : '', mensajeType : ''});
};

exports.getPrincipal = (req, res) => {
    res.render('index', {
        nick : req.session.user.nick,
        sessionActive : req.session.user.sessionActive
    });
};

exports.postUsers = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({email:email});
        if(user){
            const doMatch = await bcrypt.compare(password, user.password);
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = {
                    ID: user._id,
                    email: user.email,
                    nick : user.usuario,
                    sessionActive : req.session.isLoggedIn
                }
                req.session.save(error => {
                   res.redirect('/home');
                });
            }
            else{
                req.flash('error', 'La contraseña no coincide, intente de nuevo por favor');
                res.redirect('/error');
            }
        }
        else{
            req.flash('error', 'Credenciales incorrectas, verifiquelas por favor');
            res.redirect('/error');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getRegister = (req, res) => {
    res.render('register', {
        mensaje:'',
        oldInput: {
            email: '',
            usuario: '',
            password : '',
            repassword: ''
        }
    });
};

exports.postRegister = async (req, res) => {
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('register', {
            mensaje: errors.array()[0].msg, mensajeType: 'error',
            oldInput: {
                email: email,
                usuario: usuario,
                password : password,
                repassword: req.body.repassword
            }
        });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email : email,
            usuario : usuario,
            password : hashPassword
        });
        user.save().then(result => {
            req.flash('success', 'Usuario creado correctamente!')
            res.redirect('/success')
        });
    } catch (error) {
        console.log('Error al cifrar password',error);
    }
};

exports.getError = (req, res) => {
   let mensaje = req.flash('error');

    if(mensaje.length > 0){
        mensaje = mensaje[0];
    }
    else{
        mensaje = null;
    }

    res.render('login', {
        mensajeType : 'error',
        mensaje : mensaje
    }); 
};

exports.getSuccess = (req, res) => {
    let mensaje = req.flash('success');

    if(mensaje.length > 0){
        mensaje = mensaje[0];
    }
    else{
        mensaje = null;
    }

    res.render('login', {
        mensajeType : 'success',
        mensaje : mensaje
    }); 
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};

exports.getHome = (req, res) => {
    console.log(req.session.user);
    res.render('home', {
        ID: req.session.user.ID,
        nick : req.session.user.nick,
        sessionActive : req.session.user.sessionActive
    });
};

exports.getUsers = (req, res) => {
    res.status(200).json([
        /*{
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        },
        {
            "Nombre":"Rodolfo Frías",
            "photoPath":"../img/yo.PNG",
            "sender":"You",
            "Message":"Hola bro..",
            "Fecha": "11:55am"
        }*/
    ])
};
  