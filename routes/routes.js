const express = require('express');
const routes = express.Router()

routes.get("/", function(req, res){
    res.render("homepage.ejs"); 
});

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