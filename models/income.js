const mongoose = require('mongoose');
var incomeSchema = new mongoose.Schema({
  name : {type : String , trim : true , required : true},
  amount : {type : Number , required : true}
})
var INCOME = mongoose.model('INCOME' , incomeSchema , 'income');
module.exports = INCOME;