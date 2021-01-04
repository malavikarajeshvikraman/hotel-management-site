const express = require('express');
const routes = express.Router()
const db = require('../db/data')

routes.get("/booking", function(req, res){
    res.render("booking.ejs"); 
});

routes.get("/bookingstatus", function(req, res){
    var startdate = req.body.trip_start;
    var enddate  = req.body.trip_end;
    var i;
    var max=[6];
    for(i=1;i<=6;i++){
        var sql = 'select count(roomno) as counter from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));'
        db.query(sql, [i,startdate, enddate], function(err,data,fields){
            if(err) throw err
            data.forEach(function(v){ max[i]=parseInt(v.counter);})
            console.log(max[i]);
        });
    }
    
    res.render("booking.ejs",{max : max}); 
});

module.exports = routes;