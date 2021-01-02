var express = require('express');
var router = express.Router();
router.get("/admindashboard", function(req, res){
    res.render("admindashboard.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
module.exports = router;