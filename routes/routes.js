const express = require('express');
const routes = express.Router()
var db=require('../db/data');

routes.get("/", function(req, res){
    res.render("homepage.ejs"); 
});
routes.get("/Services", function(req, res){
    res.render("services.ejs"); 
});
routes.get("/services2", function(req, res){
    res.render("services2.ejs"); 
});
routes.post('/contactus', function(req, res,next){
    var name= req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var sql='INSERT INTO CONTACTUS values (?,?,?,?)';
    db.query(sql, [name , email,subject,message], function (err, data, fields) {
        if(err) throw err
        
        res.render("homepage.ejs"); 
        
    })
})
routes.get("/payment", function(req, res){
    res.render("payment.ejs"); 
});


routes.get("/mockpay", function(req, res){
    res.render("mockpay.ejs"); 
});

routes.get("/success", function(req, res){
    res.render("success.ejs"); 
});

routes.get("/roomspage", function(req, res){
    res.render("roomspage.ejs"); 
});

routes.get("/*", function(req, res){
    res.send("You went to a route that doesn't exist. Shame on you.");
});
module.exports=routes

//routes.get("/booking", function(req, res){
  // res.render("booking.ejs"); 
//});