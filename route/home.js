const controller = require('../controller/controller.home');
const express = require('express');
var router = express.Router();

router.get('/' , controller.home);

router.post('/' , controller.add);

router.get('/:id/delete' , controller.delete)

//router.get('/:month', controller.getEachMonth)

module.exports = router;