var INCOME = require('../models/income');
var EXPENSES = require('../models/expenses');
var BUDGET = require('../models/budget');
const numberStandard = require('../numberStandar');
const getMonth = require('../getDate');

module.exports.home = async (req, res) => {
  let totalPer = "--";
  let totalBudget = "+ 0.00";
  let budget = await BUDGET.findById(req.signedCookies.userId);
  var income = budget.income;
  var expenses = budget.expenses;
  var totalIncome = "0.00";
  var totalExpenses = "0.00";
  var obj = [];
  if (income.length) {
    totalIncome = income.map(ele => {
      return ele.amount;
    }).reduce((a, b) => a + b);

    if (expenses.length) {
      totalExpenses = expenses.map(ele => {
        return ele.amount;
      }).reduce((a, b) => a + b);
      totalPer = Math.round(totalIncome / totalIncome * 100);

      if (totalExpenses > totalIncome) {
        totalBudget = "- " + numberStandard(Math.abs(totalIncome - totalExpenses));
      } else {
        totalBudget = "+ " + numberStandard(totalIncome - totalExpenses);
      }
      var arrPercentage = expenses.map(ele => {
        return Math.round(ele.amount / totalIncome * 100);
      })
      console.log(arrPercentage);
      for (let i = 0; i < arrPercentage.length; i++) {
        obj[i] = {
          expenses: expenses[i],
          percentage: arrPercentage[i]
        }
      }

    } else {
      totalBudget = "+ " + numberStandard(totalIncome)
    }
    totalPer = Math.round((totalExpenses / totalIncome) * 100);
  } else {
    for (let i = 0; i < expenses.length; i++) {
      obj[i] = {
        expenses: expenses[i],
        percentage: "--"
      }
    }
    if (expenses.length) {
      totalExpenses = expenses.map(ele => {
        return ele.amount;
      }).reduce((a, b) => a + b);
      totalBudget = "- " + numberStandard(totalExpenses);
    }
  }


  //console.log(income.length);
  res.render('index', {
    "income": income,
    "expenses": obj,
    "allAmountIncome": numberStandard(totalIncome),
    "allAmountExpenses": numberStandard(totalExpenses),
    "totalPer": totalPer,
    "totalBudget": totalBudget,
    "month": getMonth()
  });
}
module.exports.add = async (req, res) => {
  var title = req.body.title;
  var amount = req.body.amount;
  var budget = await BUDGET.findById(req.signedCookies.userId)
  console.log("bughet" + budget);

  if (req.body.select == 'inc') {
    budget.income[budget.income.length] = {
      name: title,
      amount: amount
    };
  } else {
    budget.expenses[budget.expenses.length] = {
      name: title,
      amount: amount
    };
  }

  budget.save();
  res.redirect('/home');
}

module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  var budget = await BUDGET.findById(req.signedCookies.userId);
  var income = budget.income;
  var expenses = budget.expenses;

  function findIndex(arr, key, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] == value) {
        return i;
      }
    }
    return null;
  }
  var index;
  if(findIndex(income, '_id', id) != null) {
    index = findIndex(income, '_id', id);
    budget.income.splice(index , 1);
  } else {
    index = findIndex(expenses , '_id' , id);
    budget.expenses.splice(index , 1);
  }
  console.log("index" + index);
  budget.save();
  res.redirect('/home');
}