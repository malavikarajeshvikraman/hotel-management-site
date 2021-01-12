
const { render } = require('ejs');
const express = require('express');
var db=require('../db/data');
const routes = express.Router()
var async=require("async");

routes.get("/booking", function(req, res){
    var max =[]
    var curr=[]
    for (i=1;i<=6;i++){
        var sql1='select current_price from room_types where roomtypeid =(?)'
    
        db.query(sql1, [i], function (err, data, fields) {
            if(err) throw err
            data .forEach(function(v){ curr.push(parseInt(v.current_price)); })
        });
    
            
    }
    function function1(){

        if(req.session.loggedIn){
            req.session.curr=curr;
            console.log(req.session.curr);
            res.render('booking.ejs',{current_price:curr,username:req.session.username,maximum:max})
        }else{
            res.redirect('/login');
        }
    
    }
    setTimeout( function1, 3000);
    
});


routes.post("/bookingstatus", function(req, res,next){
    req.session.startdate = req.body.trip_start;
    req.session.enddate =  req.body.trip_end;
    console.log(req.session.enddate);
    var i;
    var max= []
   for (i=1;i<=6;i++){
    var sql='select count(roomno) as counter from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));';
    db.query(sql, [i,req.session.startdate , req.session.enddate], function (err, data, fields) {
        if(err) throw err
        data .forEach(function(v){ max.push(parseInt(v.counter)); })
    });


        
}
function function2() {
    // all the stuff you want to happen after that pause
    console.log('finally');
    console.log(req.session.username)
    
    if(req.session.loggedIn){
        res.render('booking.ejs',{username:req.session.username,current_price:req.session.curr,maximum:max})
    }else{
        res.redirect('/login');
    }

    
  
}


        setTimeout( function2, 3000);
    
      
    
   

});

module.exports = routes;

