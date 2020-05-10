const controller = require('../controller/controller.login');
const express = require('express');
var router = express.Router();

router.get('/' , controller.login);

router.post('/' , controller.loginPost);

router.get('/signin' , controller.signIn);

router.post('/signin' , controller.signInPost);

router.get('/forgot' , controller.forgot);

router.post('/forgot' , controller.forgotPost);


module.exports = router;