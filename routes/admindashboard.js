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

router.get("/admindashboard/rooms", function(req, res){
    var sql='SELECT * FROM room';
    db.query(sql, function (err, data, fields) {
        if(err) throw err;
        data .forEach(function(v){ var sql1='SELECT distinct type_name FROM room_types where roomtypeid = (?) ';
        db.query(sql1, [v.roomtypeid],function (err, ans, fields) {

            if(err) throw err;
            ans.forEach(function(u){v.roomtype=u.type_name})
        });
    
    });

    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(req.session.username)
        if(req.session.loggedIn){
             res.render("admin/rooms.ejs",{ userData : data ,alertMsg: req.session.message });
        }else{
            res.redirect('/adminlogin');
        }
      
    }
    

    setTimeout( function2, 5000);
      
        
});


});

router.post('/addroom', function(req, res, next) {
    inputData ={
        roomno: parseInt(req.body.roomno),
        roomtypeid: parseInt(req.body.roomtype),
        current_price : 0
        
    }
var sql='SELECT * FROM room WHERE roomno = (?)';
db.query(sql, [inputData.roomno] ,function (err, data1, fields) {
 if(err) throw err
 if(data1.length>=1){
    console.log('That looks fine');
     req.session.message =  inputData.roomno+ " is already added .";
   
 }else{
    var sql1='SELECT  distinct current_price  FROM room_types where  roomtypeid  = (?)';
 db.query(sql1, [inputData.roomtypeid],function (err, ans, fields) {

 if(err) throw err;

 ans.forEach(function(u){
    inputData.current_price=u.current_price ; });
    console.log(inputData.current_price);
    var sql = 'INSERT INTO room  SET ?';
    db.query(sql, inputData, function (err, data1) {
        if (err) throw err;
             });
             console.log('That looks fine too');
             req.session.message = " Successfully added room ";
 
});
      console.log(inputData.current_price);
    // save users data into database
 }

 function function2() {
    // all the stuff you want to happen after that pause
    console.log('finally');
    console.log(req.session.username)
    if(req.session.loggedIn){
         res.redirect('/admindashboard/rooms');
    }else{
        res.redirect('/adminlogin');
    }
  
}


setTimeout( function2, 5000);

 
})
     
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