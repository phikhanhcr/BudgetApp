const EachMonth = require('../models/eachMonth')
const numberStandard = require('../numberStandar');
const getMonth = require('../getDate');

module.exports.home = async (req, res) => {
  let totalPer = "--";
  let totalBudget = "+ 0.00";
  let checkMonthNow = 'none';
  // 1. check month hien tai 
  console.log("Home=====================")
  var currentMonth = new Date().getMonth() + 1;
  // 2. find budget of current Month 
  let budgetMonth = await EachMonth.find({ userId: req.signedCookies.userId })
  console.log(budgetMonth);
  const allBudgetAllMonth = budgetMonth[0].allBudget

  // find sum of income and expense each month
  
  var eachMonthBudgetChartIncome = allBudgetAllMonth.map(ele => {
    if(ele.length !== 0 ) {
      return ele.income.reduce((a, b) => {
        return a + b.amount 
      }, 0)
    }
  }).splice(0,currentMonth)
  var eachMonthBudgetChartExpense = allBudgetAllMonth.map(ele => {
    if(ele.length !== 0 ) {
      return ele.expenses.reduce((a, b) => {
        return a + b.amount 
      }, 0)
    }
  }).splice(0,currentMonth)
  
  console.log(eachMonthBudgetChartIncome)
  console.log(eachMonthBudgetChartExpense)

  // convert it to an array
  // pass as parameter
  var budgetCurrentMonth;
  if(req.query.selectMonth === undefined ) {
    budgetCurrentMonth = allBudgetAllMonth.filter(ele => {
      return ele.month === currentMonth
    });
    checkMonthNow = "block";
  } else {
    budgetCurrentMonth = allBudgetAllMonth.filter(ele => {
      return ele.month === parseInt(req.query.selectMonth)
    });
  }
  if(parseInt(req.query.selectMonth) === currentMonth ) {
    checkMonthNow = "block"
  } 
  
  
  var income = budgetCurrentMonth[0].income;
  console.log('income')
  console.log(income)
  var expenses = budgetCurrentMonth[0].expenses;
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
  // select month , if selected month is not current month
  // readonly, can't add or delete 
  
  const arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  res.render('index', {
    "income": income,
    "expenses": obj,
    "allAmountIncome": numberStandard(totalIncome),
    "allAmountExpenses": numberStandard(totalExpenses),
    "totalPer": totalPer,
    "totalBudget": totalBudget,
    "month": getMonth.getCurrentMonth(),
    "newArrMonth": arrMonth,
    "chartIncome" : eachMonthBudgetChartIncome,
    "chartExpense" : eachMonthBudgetChartExpense,
    "checkMonthNow" : checkMonthNow,
    "arrMonthUptoNow" : getMonth.getArrayMonthUptoNow()
  });
}



// module.exports.getEachMonth = async ( req, res ) => {
//   const currentMonth = req.query.month;
// }


module.exports.add = async (req, res) => {
  var title = req.body.title;
  var amount = req.body.amount;

  let budgetMonth = await EachMonth.find({ userId: req.signedCookies.userId });
  const allBudgetAllMonth = budgetMonth[0].allBudget
  var currentMonth = new Date().getMonth() + 1;
  console.log(allBudgetAllMonth)
  var budgetCurrentMonth = allBudgetAllMonth.filter(ele => {
    return ele.month === currentMonth
  })
  console.log(budgetCurrentMonth)

  if (req.body.select == 'inc') {
    budgetCurrentMonth[0].income[budgetCurrentMonth[0].income.length] = {
      name: title,
      amount: amount
    };
  } else {
    budgetCurrentMonth[0].expenses[budgetCurrentMonth[0].expenses.length] = {
      name: title,
      amount: amount
    };
  }

  budgetMonth[0].save();
  res.redirect('/home');
}

module.exports.delete = async (req, res, next) => {
  let budgetMonth = await EachMonth.find({ userId: req.signedCookies.userId });
  const allBudgetAllMonth = budgetMonth[0].allBudget
  var currentMonth = new Date().getMonth() + 1;
  var budgetCurrentMonth = allBudgetAllMonth.filter(ele => {
    return ele.month === currentMonth
  })
  var id = req.params.id;
  var income = budgetCurrentMonth[0].income;
  var expenses = budgetCurrentMonth[0].expenses;

  function findIndex(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] == value) {
        return i;
      }
    }
    return null;
  }
  var index;
  console.log("index    + ", index)
  if (findIndex(income, '_id', id) != null) {
    index = findIndex(income, '_id', id);
    budgetCurrentMonth[0].income.splice(index, 1);
  } else {
    index = findIndex(expenses, '_id', id);
    budgetCurrentMonth[0].expenses.splice(index, 1);
  }
  console.log("index" + index);
  budgetMonth[0].save();
  res.redirect('/home');
}

// 