const { render } = require('ejs');
const express = require('express');
var db=require('../db/data');
const routes = express.Router()
var async=require("async");

routes.get("/booking", function(req, res){
    var max =[]
    res.render("booking.ejs",{maximum:max}); 
});


routes.get("/bookingstatus", function(req, res){
    var startdate = req.body.trip_start;
    var enddate =  req.body.trip_end;
    var i;
    var max= []
   for (i=1;i<=6;i++){
    var sql='select count(roomno) as counter from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));';
    db.query(sql, [i,startdate , enddate], function (err, data, fields) {
        if(err) throw err
        data .forEach(function(v){ max.push(parseInt(v.counter)); })
    });

        
}
function function2() {
    // all the stuff you want to happen after that pause
    console.log('finally');
    console.log(max[0])
    res.render('booking.ejs',{maximum : max});
    console.log('Blah blah blah blah extra-blah');
}


        setTimeout( function2, 5000);
    
      
    
   

});

module.exports = routes;
