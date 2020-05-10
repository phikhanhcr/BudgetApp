var USER = require('../models/user.models');
module.exports.login = (req, res) => {
  if(req.signedCookies.userId) {
    res.clearCookie('userId');
  }
  res.render('login');
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

module.exports.signInPost = async (req, res , next )  => {
  let email = req.body.email;
  let user = req.body.name;
  let pass1 = req.body.pass;
  let pass2 = req.body.pass2;
  var checkEmail = await USER.find({email : email})
  if(checkEmail.length) {
    res.render('signin' , {
      "values" : req.body,
      "errors" : ['Email already exist !']
    })
    return;
  }
  const checkUser = await USER.find({user : user})
  
  if(checkUser.length) {
    res.render('signin' , {
      "values" : req.body,
      "errors" : ['User already exist !']
    })
    return;
  }
  if(pass1 !== pass2 ){
    res.render('signin' , {
      "values" : req.body,
      "errors" : ['Two Passwords must be the same !']
    })
    return;
  }
  const value = {
    email : email ,
    user : user , 
    pass : pass1 
  }
  await USER.insertMany(value);
  res.redirect('/login');
}

module.exports.forgot = (req , res , next ) => {
  res.render('forgot');
}
module.exports.forgotPost = async (req , res , next ) => {
  let email = req.body.email;
  let checkEmail = await USER.find({email : email});
  if(!checkEmail.length) {
    res.render('forgot' , {
      "errors" : [`Email doesn't  exist !`]
    })
    return;
  }
  let user = req.body.name ;
  let checkUser = checkEmail[0].user;
  console.log(checkUser);
  if(checkUser !== user) {
    res.render('forgot' , {
      "errors" : [`Username is not found!`]
    })
    return;
  }
  let pass1 = req.body.pass;
  let pass2 = req.body.pass1;
  if(pass1 !== pass2 ){
    res.render('signin' , {
      "errors" : ['Two Passwords must be the same !']
    })
    return;
  }
  await USER.findOneAndUpdate({email : email} , {pass : pass2})
  res.redirect('/login');
}