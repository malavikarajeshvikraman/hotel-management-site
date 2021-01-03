var express = require('express');
var router = express.Router();
var db=require('../db/data');
// to display registration form 
router.get("/register", function(req, res){
    res.render("register.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
        full_name: req.body.full_name,
        email_address: req.body.email,
        username : req.body.username,
        password: req.body.password,
        
    }
    const confirm_password = req.body.confirm_password;
var sql='SELECT * FROM registration WHERE email_address = (?)';
db.query(sql, [inputData.email_address] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>=1){
    console.log('That looks fine');
     var msg = inputData.email_address+ " is already used for an account";
 }else if(confirm_password != inputData.password){
    var msg ="Password & Confirm Password is not Matched";
 }else{
     
    // save users data into database
    var sql = 'INSERT INTO registration SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
           console.log('That looks fine too');
  var msg ="Your are successfully registered";
 }
 res.render('register.ejs',{alertMsg:msg});
})
     
});
module.exports = router;