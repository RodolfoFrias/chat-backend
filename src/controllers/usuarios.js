'use strict'

const User = require('../model/usuario');

exports.postUsers = async (req, res) => {
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
          res.render('index', {
              nick : us_existe[0].usuario
          });
        }
        res.redirect('/error');
    } 
  };
  