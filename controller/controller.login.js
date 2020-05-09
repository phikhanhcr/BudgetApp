var USER = require('../models/user.models');
module.exports.login = (req, res) => {
  res.render('login')
}

module.exports.loginPost = async (req, res) => {
  var username = req.body.name;
  var user = await USER.find({user : username});
  if(!user.length ) {
    res.render('login' , {
      "errors" : [`Account doesn't exist !`]
    })
  }
  if(user[0].pass !== req.body.pass) {
    res.render('login' , {
      "errors" : [`Wrong password !`]
    })
  }
  res.cookie('userId' , user[0]._id , {
    signed : true
  })
  
  res.redirect('/home');
}


module.exports.signIn = (req, res) => {
  res.render('signin');
}