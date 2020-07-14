var mongoose = require('mongoose');
var monthSchema = mongoose.Schema({
  userId: { type: String, trim: true, required: true },
  allBudget: [{
    month: { type: Number, trim: true, required: true },
    income: [{
      name: { type: String, trim: true, required: true },
      amount: { type: Number, required: true }
    }],
    expenses: [{
      name: { type: String, trim: true, required: true },
      amount: { type: Number, required: true }
    }]
  }]
})

var Month = mongoose.model('Month', monthSchema, 'month');
module.exports = Month;