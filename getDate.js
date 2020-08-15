var arrayMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var a = new Date().getMonth();
module.exports.getCurrentMonth = () => {
  return arrayMonth[a];
}
module.exports.getArrayMonthUptoNow = () => {
  return arrayMonth.slice(0, a + 1);
}