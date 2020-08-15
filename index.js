require('dotenv').config()
var express = require('express');
const app = express();
var bodyParser = require('body-parser')
const port = 3001;
const pug = require('pug');
const mongoose = require('mongoose');
const routerHome = require('./route/home');
const routerLogin = require('./route/login.route');
const cookieParser = require('cookie-parser');
const checkCookies = require('./middleware/checkCookies');
const checkEachMonth = require('./middleware/checkEachMonth')

app.set('view engine', 'pug')
app.set('views', './views');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(process.env.SECRETSIGNEDCOOKIES))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MongoDb, { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.redirect('home')
})


// home 
app.use('/home', checkCookies.checkCookies, checkEachMonth.checkEachMonth, routerHome)
app.use('/login', routerLogin);

app.listen(port, () => {
  console.log('App listening on port ' + port);
})