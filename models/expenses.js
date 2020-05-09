const mongoose = require('mongoose');
var expensesSchema = new mongoose.Schema({
  name : {type : String , trim : true , required : true},
  amount : {type : Number , required : true}
})
var EXPENSES = mongoose.model('EXPENSES' , expensesSchema , 'expenses');
module.exports = EXPENSES;