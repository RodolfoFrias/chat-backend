'use strict'

const User = require('../model/usuario');
const bcrypt = require('bcryptjs');

exports.getIndex = (req, res) => {
    res.render('login', {mensaje : '', mensajeType : ''});
};

exports.getPrincipal = (req, res) => {
    res.render('index', {
        nick : req.session.user.nick
    });
};

exports.postUsers = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
        .then(user => {
            console.log(user);
            if(user){
                bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    req.session.isLoggedIn = true;
                    req.session.user = {
                        nick : user.usuario
                    }
                    req.session.save(error => {
                        res.redirect('/principal');
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else{
                req.flash('error', 'Credenciales incorrectas, verifiquelas por favor');
                res.redirect('/error');
            }
    })
    .catch(error =>
         console.log(`Error: ${error}`));
};

exports.getRegister = (req, res) => {
    res.render('register', {mensaje:''});
};

exports.postRegister = (req, res) => {
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;

   User.findOne({email: email})
   .then(result => {
        if(!result){
            bcrypt.hash(password, 12)
            .then(hashPassword => {
                const user = new User({
                    email : email,
                    usuario : usuario,
                    password : hashPassword
                });
                user.save().then(result => {
                    req.flash('success', 'Usuario creado correctamente!')
                    res.redirect('/success')
                });
           });
        }
        else{
            req.flash('error', 'El correo proporcionado ya existe');
            res.redirect('/error');
        }
   })
   .catch(error => {
       console.log(err);
   });
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
  