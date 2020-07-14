var EachMonth = require('../models/eachMonth');

module.exports.checkEachMonth = async (req, res, next) => {
  // Check Has Budget had currentUser yet ? 
  var checkBudget = await EachMonth.find({ userId: req.signedCookies.userId })
  if (!checkBudget.length) {
    await EachMonth.insertMany({ userId: req.signedCookies.userId, allBudget: [] });
    
    checkBudgetAgain = await EachMonth.find({ userId: req.signedCookies.userId })
    console.log(checkBudgetAgain)
    let budget = checkBudgetAgain[0].allBudget
    if (budget.length === 0) {
      for (let i = 0; i < 12; i++) {
        budget.push({
          month: i + 1,
          income: [],
          expenses: []
        })
      }
      console.log("Oke")
    }
    console.log(checkBudgetAgain[0].allBudget)
    checkBudgetAgain[0].save();
  }
  next();
}