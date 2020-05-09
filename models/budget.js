const mongoose = require('mongoose');
var budgetSchema = new mongoose.Schema({
  _id : { type: String, trim: true, required: true },
  income: [{
    name: { type: String, trim: true, required: true },
    amount: { type: Number, required: true }
  }],
  expenses: [{
    name: { type: String, trim: true, required: true },
    amount: { type: Number, required: true }
  }]
})

var BUDGET = mongoose.model('BUDGET', budgetSchema, 'budget');
module.exports = BUDGET;