var express = require('express');
var router = express.Router();
var db=require('../db/data');
/* GET users listing. */
router.get('/userdashboard', function(req, res, next) {
    if(req.session.loggedIn){
        req.session.message=" ";
        var sql='SELECT id FROM registration WHERE username = (?)';
        db.query(sql, [req.session.username ], function (err, data, fields) {
             req.session.userid=data[0].id
        });
        setTimeout( function2, 50);
       
    }else{
        res.redirect('/login');
    }

    function function2 () {
        req.session.message="";
        res.render('userdashboard.ejs',{username:req.session.username});
    }
});

router.get('/userdashboard/details', function(req, res, next) {
    var sql='SELECT * FROM registration WHERE username = ?';
    db.query(sql, [req.session.username ], function (err, data, fields) {
        if(err) throw err
        if(req.session.loggedIn){
            console.log(req.session.message);
            res.render('details.ejs',{username:req.session.username,data : data[0] ,alertMsg : req.session.message})
        }else{
            res.redirect('/login');
        }
    })
    
});

router.get('/userdashboard/payments', function(req, res, next) {
  
    var sql1='SELECT * FROM order_table where id = (?)';
    db.query(sql1, [req.session.userid], function (err, data, fields) {
        if(err) throw err;
        var total =0;
        data .forEach(function(v){ var sql1='SELECT distinct full_name FROM registration where id = (?) ';
        db.query(sql1, [v.id],function (err, ans, fields) {

            if(err) throw err;
            ans.forEach(function(u){v.id=u.full_name})
        });
        v.totalrooms=v.singler+v.doubler+v.tripler+v.studio+v.executive_s+v.presedential_s;
    });   res.render("upayments.ejs",{ userData : data  });});
  


    
});

router.get('/userdashboard/booking', function(req, res, next) {
   
    function function2(){
    var sql1='SELECT * FROM reservation where id = (?)';
    db.query(sql1,[req.session.userid],function (err, data, fields) {
        if(err) throw err;
        console.log(req.session.userid);
        res.render("ubookings.ejs",{ userData : data  });
        
});}

setTimeout( function2, 2000);
    
});
router.post('/changephno', function(req, res, next) {
    
    inputData ={
        phone: parseInt(req.body.phno)
        
    }
var sql='Update registration set phno = (?)  WHERE username = (?)';
db.query(sql, [inputData.phone,req.session.username] ,function (err, data1, fields) {
 if(err) throw err
 req.session.message="Successfully Updated Phone Number";
  res.redirect('/userdashboard/details');
     
});
});
router.post('/changeadd', function(req, res, next) {
    
    inputData ={
        address: req.body.address
        
    }
var sql='Update registration set address = (?)  WHERE username = (?)';
db.query(sql, [inputData.address,req.session.username] ,function (err, data1, fields) {
 if(err) throw err
 req.session.message="Successfully Updated Address";
  res.redirect('/userdashboard/details');
     
});
});
router.post('/changemail', function(req, res, next) {
    
    inputData ={
        email: req.body.email
        
    }
    var sql='SELECT * FROM registration WHERE email_address = (?) ';
    db.query(sql, [inputData.email] ,function (err, data, fields) {
     if(err) throw err
     if(data.length>=1){
        console.log('That looks fine');
         req.session.message = inputData.email+ " is already used for an account";
     }
    else{
         
        var sql='Update registration set email_address = (?)  WHERE username = (?)';
        db.query(sql, [inputData.email,req.session.username] ,function (err, data1, fields) {
         if(err) throw err
         req.session.message="Successfully Updated Email Address";
          res.redirect('/userdashboard/details');
             
        });}
    })
});
router.post('/changepass', function(req, res, next) {
    
    inputData ={
        opass: req.body.oldpass,
        password:req.body.password
        
    }
    var sql='SELECT password FROM registration WHERE username = (?) ';
    db.query(sql, [req.session.username] ,function (err, data, fields) {
     if(err) throw err
     if(data[0].password===inputData.opass){
         
        var sql='Update registration set password = (?)  WHERE username = (?)';
        db.query(sql, [inputData.password,req.session.username] ,function (err, data1, fields) {
         if(err) throw err
         req.session.message="Successfully Changed password";
          res.redirect('/userdashboard/details');
             
        });}
    else{
        req.session.message="Entered wrong old password";
          res.redirect('/userdashboard/details');
         
        }
    })
});
module.exports = router;