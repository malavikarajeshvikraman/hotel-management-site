const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var registrationRouter = require('./routes/registration');
const routes = require('./routes/routes');
const sqlcon = require('./routes/sql');
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', registrationRouter);
app.use(routes);
app.use('/api/users',sqlcon);
app.use(cookieParser())
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(express.static('public'));


app.listen(3000, () => console.log('Example app listening on port 3000!'));