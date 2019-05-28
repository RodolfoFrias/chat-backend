const express = require('express');
const router = express.Router();
const User = require('../model/usuario');

router.get('/', (req, res, err) => {
    res.render('login', info = {mensaje : ''});
});

router.get('/principal', (req, res) =>{
    res.render('index');
});

router.get('/logout', (req, res) =>{
    res.redirect('/');
});

router.get('/error', (req, res) => {
    res.render('login', info = {
        mensaje : 'Nickname ya usado'
    });    
});

router.post('/registro', async (req, res, err) => {
  let us_existe = await User.find({usuario : req.body.usuario});
   
  if(us_existe == ''){
    const user = new User(req.body);
    await user.save();
    res.render('index', info = {
        nick : req.body.usuario
    });
  }
  else{
      if(req.body.usuario === us_existe[0].usuario && 
         req.body.password === us_existe[0].password){
        res.render('index', info = {
            nick : us_existe[0].usuario
        });
      }
      res.redirect('/error');
  } 
});

module.exports = router;