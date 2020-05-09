function hi() {

  var fields = document.querySelectorAll(
    ".add__type" + ',' +
    ".add__description" + ',' +
    ".add__btn");

  function nodeListForEach(list, cb) {
    for (let i = 0; i < list.length; i++) {
      cb(list[i]);
    }
  }
  nodeListForEach(fields, function (cur) {
    cur.classList.toggle('red-focus');
  });

  document.querySelector(".add__btn").classList.toggle('red');
}
hi();