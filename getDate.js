module.exports = () => {
  var a = new Date().getMonth();
  var arrayMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return arrayMonth[a];
}