var express = require('express');
var router = express.Router();
var db=require('../db/data');
// to display registration form 
router.get("/login", function(req, res){
    res.render("login.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
// to store user input detail on post request
router.post('/login', function(req, res,next){
    var username= req.body.username;
    var password = req.body.password;
    var sql='SELECT * FROM registration WHERE username = ? AND password = ?';
    db.query(sql, [username , password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedIn= true;
            req.session.username= username;
            console.log('Got in');
            res.redirect('/userdashboard');
        }
        else{
            res.render('login.ejs',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;