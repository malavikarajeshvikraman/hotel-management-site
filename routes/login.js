var express = require('express');
var router = express.Router();
var db=require('../db/data');
// to display registration form 
router.get("/login", function(req, res){
    res.render("login.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
// to store user input detail on post request
router.post('/login', function(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
var sql='SELECT * FROM registration WHERE username =(?)';
db.query(sql, [username] ,function (err, data, fields) {
 if(err) throw err;
 if(data.length>=1 && data.password == password){
    console.log('found it ');
 }else {
    var msg ="Username  does not match Password ";
 }
 res.render('login.ejs',{alertMsg:msg});
})
     
});
module.exports = router;