const { render } = require('ejs');
const express = require('express');
var db=require('../db/data');
const routes = express.Router()
var async=require("async");

routes.get("/booking", function(req, res){
    var max =[6]
    res.render("booking.ejs",{maximum:max}); 
});
function getmaximum( cb) { 
    var pending = 6;
    var max = [6];
    var i;
    for (i=1;i<=6;i++){
    var sql='select count(roomno) as counter from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));';
     db.query(sql, [i,startdate , enddate], function (err, data, fields) {
        if(err) throw err
        data .forEach(function(v){ max[i] = parseInt(v.counter); })
        console.log(max[i]);
    });
    if( 0 === --pending ) {
        cb(max); //
    }
}
}

routes.get("/bookingstatus", function(req, res){
    var startdate = req.body.trip_start;
    var enddate =  req.body.trip_end;
    var i;
    var max = [6];
   /* for (i=1;i<=6;i++){
    var sql='select count(roomno) as counter from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));';
     db.query(sql, [i,startdate , enddate], function (err, data, fields) {
        if(err) throw err
        data .forEach(function(v){ max[i] = parseInt(v.counter); })
        console.log(max[i]);
    });
    if( 0 !== --pending ) 
        break;
        
}   */
    getmaximum( function(max){
        console.log(max);
    });
    res.render('booking.ejs',{maximum : max});

});

module.exports = routes;
