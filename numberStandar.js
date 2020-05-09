// 2500000 => 2,500,000
module.exports = num => {

  let y = num.toString();
  if (y.length > 3) {
    y = y.substr(0 , y.length - 3 ) + ',' + y.substr(y.length - 3 , 3) + ' VND';
  }
  return y;
}



