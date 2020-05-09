const controller = require('../controller/controller.login');
const express = require('express');
var router = express.Router();

router.get('/' , controller.login);

router.post('/' , controller.loginPost);

router.get('/signin' , controller.signIn);

module.exports = router;