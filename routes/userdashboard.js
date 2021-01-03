var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/userdashboard', function(req, res, next) {
    if(req.session.loggedIn){
        res.render('userdashboard.ejs',{username:req.session.username})
    }else{
        res.redirect('/login');
    }
});
module.exports = router;