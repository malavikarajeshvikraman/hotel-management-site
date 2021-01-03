var express = require('express');
var router = express.Router();
var db=require('../db/data');


router.get("/admindashboard", function(req, res){
    res.render("admin/admindashboard.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
router.get("/admindashboard/users", function(req, res){
    var sql='SELECT * FROM registration';
    db.query(sql, function (err, data, fields) {
        if(err) throw err;
        res.render("admin/users.ejs",{ userData : data ,alertMsg: req.session.message });
        
});

});
router.get('/admindashboard/users/delete/:username', function(req, res, next) {
    console.log('Got in');
        
           var id= req.params.username;
           var sql = 'DELETE FROM registration WHERE username = ?';
           db.query(sql, [id], function (err, data) {
           if (err) throw err;
           console.log(data.affectedRows + " record(s) updated");
         });
         req.session.message = "The data is successully deleted";
           console.log('Thing was saved to the database.');

        res.redirect('/admindashboard/users');
   
      
   
       
     });
router.post('/adduser', function(req, res, next) {
    
    inputData ={
        full_name: req.body.full_name,
        email_address: req.body.email,
        username : req.body.username,
        password: req.body.password,
        
    }
    const confirm_password = req.body.password;
var sql='SELECT * FROM registration WHERE email_address = (?)';
db.query(sql, [inputData.email_address] ,function (err, data1, fields) {
 if(err) throw err
 if(data1.length>=1){
    console.log('That looks fine');
     req.session.message =  inputData.email_address+ " is already used for an account";
   
 }else{
     
    // save users data into database
    var sql = 'INSERT INTO registration SET ?';
   db.query(sql, inputData, function (err, data1) {
      if (err) throw err;
           });
           console.log('That looks fine too');
           req.session.message = " Successfully registered User ";
 }

 res.redirect('admindashboard/users');
 
})
     
});


module.exports = router;