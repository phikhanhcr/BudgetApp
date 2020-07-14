const USER = require('../models/user.models');
var BUDGET = require('../models/budget');
var EachMonth = require('../models/eachMonth')
module.exports.checkCookies = async (req, res, next) => {
  // check cookies
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }
  var userId = await USER.find({ _id: req.signedCookies.userId });
  if (!userId.length) {
    res.render('/login');
    return;
  }
  
  res.locals.User = userId[0]
  next();
}