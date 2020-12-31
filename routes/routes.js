const express = require('express');
const routes = express.Router()

routes.get("/", function(req, res){
    res.render("homepage.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
routes.get("/login", function(req, res){
    res.render("login.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});

routes.get("/roomspage", function(req, res){
    res.render("roomspage.ejs"); 
});
routes.get("/*", function(req, res){
    res.send("You went to a route that doesn't exist. Shame on you.");
});
module.exports=routes