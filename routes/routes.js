const express = require('express');
const routes = express.Router()

routes.get("/", function(req, res){
    res.render("homepage.ejs"); 
});

routes.get("/payment", function(req, res){
    res.render("payment.ejs"); 
});

routes.get("/roomspage", function(req, res){
    res.render("roomspage.ejs"); 
});

routes.get("/*", function(req, res){
    res.send("You went to a route that doesn't exist. Shame on you.");
});
module.exports=routes