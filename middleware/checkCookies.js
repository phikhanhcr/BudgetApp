const USER = require('../models/user.models');
var BUDGET = require('../models/budget');
module.exports.checkCookies = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }
  var userId = await USER.find({ _id: req.signedCookies.userId });
  if (!userId.length) {
    res.render('/login');
    return;
  }
  
  var checkBudget = await BUDGET.find({_id : req.signedCookies.userId})
  if(!checkBudget.length) {
    await BUDGET.insertMany({ _id: req.signedCookies.userId });
  }
   
  next();
}