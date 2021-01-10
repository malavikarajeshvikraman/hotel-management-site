const express = require('express');
const routes = express.Router()
var db=require('../db/data');


routes.post("/payment", function(req, res , next ){
    count = {

        d1 : ( req.body.d1  != NaN)?  parseInt(req.body.d1):0,
        d2 : ( req.body.d2 != NaN)?  parseInt(req.body.d2):0,
        d3 : (  req.body.d3  != NaN)?  parseInt(req.body.d3):0,
        d4 : ( req.body.d4  != NaN )?  parseInt(req.body.d4):0,
        d5 : ( req.body.d5 != NaN)?  parseInt(req.body.d5):0,
        d6 : (req.body.d5  != NaN)?  parseInt(req.body.d6):0,
    }
    console.log(count);
    var max= []
    for (i=1;i<=6;i++){
        var sql='select current_price from  room_types where roomtypeid = (?) ;';
        db.query(sql, [i], function (err, data, fields) {
            if(err) throw err
            data .forEach(function(v){ max.push(parseInt(v.current_price)); })
        });
    }
    
   
    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(max);
        console.log(req.session.username)
        var room =[];
        max[0] *=  count.d1;
        max[1] *= count.d2;
        max[2] *= count.d3;
        max[3] *= count.d4;
        max[4] *= count.d5;
        max[5] *= count.d6;
        room.push( count.d1);
        room.push( count.d2);
        room.push( count.d3);
        room.push( count.d4);
        room.push( count.d5);
        room.push( count.d6);
        room= room.map(value => isNaN(value) ? 0 : value);
        req.session.rooms=room;
        console.log(max);
        if(req.session.loggedIn){
            max= max.map(value => isNaN(value) ? 0 : value);
            req.session.total = max[0]+max[1]+max[2]+max[3]+max[4]+max[5];
            
            console.log(req.session.total);
            res.render('payment.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
    
    
            setTimeout( function2, 2000);
        
});

routes.post("/bookedroom", function(req, res , next ){
    count = {
        id: 0,
        order_id : ( req.body.orderid  != NaN)?  req.body.orderid:"",
        payment_id : ( req.body.payid != NaN)?  req.body.payid:"",
        singler : req.session.rooms[0],
        doubler : req.session.rooms[1],
        tripler : req.session.rooms[2],
        studio : req.session.rooms[3],
        executive_s : req.session.rooms[4],
        presedential_s : req.session.rooms[5],    
        amount : req.session.total,
        date_checkin : req.session.startdate,
        date_checkout :req.session.enddate
    }
    console.log(count);
    var sql1 = 'Select  id from  registration where username = (?);';
    db.query(sql1,req.session.username, function (err, data) {
      if (err) throw err;
      req.session.userid=(parseInt(data[0].id))
      count.id=req.session.userid;
        
      var sql = 'INSERT INTO order_table  SET ?';
    
      db.query(sql,count, function (err, data) {
        if (err) throw err;
      });
      
    });
    
   
   
    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(count);
        console.log(req.session.username)
        
        if(req.session.loggedIn){
            console.log(req.session.total);
            res.render('payment.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
    
    
            setTimeout( function2, 2000);
        


});

routes.get("/pay_success", function(req, res){
    Constants = {
        checkin : req.session.startdate,
        checkout : req.session.enddate,
        id: req.session.userid,
        booking_id : 0,
        

    }
    var rooms = [ ];
    var i;
    var max= [];
    function function0() {
   
    var sql1 = 'select  * from  order_table  where id = (?);';
db.query(sql1,req.session.userid, function (err, data) {
  if (err) throw err;
  var v= data[data.length - 1];
  console.log(data[data.length - 1])
  Constants.booking_id=(parseInt(v.booking_id));
  rooms.push(parseInt(v.singler));
  rooms.push(parseInt(v.doubler));
  rooms.push(parseInt(v.tripler));
  rooms.push(parseInt(v.studio));
  rooms.push(parseInt(v.executive_s));
  rooms.push(parseInt(v.presedential_s));
  var i=0;
  rooms.forEach ( function(u) {
    
    i=i+1;
    var temp=[]
    var sql='select roomno  from room where roomtypeid = (?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)));';
    db.query(sql, [i,Constants.checkin , Constants.checkout], function (err, newdata, fields) {
        if(err) throw err
        temp=[];
        newdata.forEach(function(v){temp.push(parseInt(v.roomno));  })
        if(u>0)
        {var hey = temp.slice(0,u)
        max.push(hey);}
        else
        max.push([])
    });
  
})


  
});
setTimeout( function1, 1000);
}

function function1() {
   

setTimeout( function2, 3000);
}
setTimeout( function0, 10);

function function2() {
  var j;
console.log("max :");
console.log(max);
for (i=1;i<=6;i++){
  var no = max[i-1].length ;
  if(max[i-1] != []){
  for(j=0; j< no;j++){
  var sql='insert into reservation( roomno, roomtypeid, id, date_checkin, date_checkout, booking_id) values (?,?,?,?,?,?);';
  db.query(sql, [max[i-1][j],i,req.session.userid,Constants.checkin , Constants.checkout,Constants.booking_id], function (err, data, fields) {
      if(err) throw err;
  }); } }
}
setTimeout( function3, 3000);
}

function function3() {
    // all the stuff you want to happen after that pause
    console.log('finally');
    console.log(req.session.username)
    if(req.session.loggedIn){
        res.render('booking.ejs',{username:req.session.username,maximum:max})
    }else{
        res.redirect('/login');
    }
  
}


      
    
      
    
   

});

routes.get("/pay_success", function(req, res){
    count = {
        
        checkin : req.session.startdate,
        checkout : req.session.enddate,
        id : req.session.userid
    }

    console.log(count);
    var sql = 'select roomno from roomtypeid=(?) and roomno not in ( select roomno from reservation where ( date_checkout > (?) ) and ( date_checkin < (?)))';
    db.query(sql,req.session.startdate,req.session.enddate, function (err, data,fields) {
      if (err) throw err;
      data .forEach(function(v){ count.id=(parseInt(v.roomid)); });
        max.push(temp)
      
    });
    
   
   
    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(count);
        console.log(req.session.username)
        
        if(req.session.loggedIn){
            console.log(req.session.total);
            res.render('payment.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
    
    
            setTimeout( function2, 2000);
        


});

// ------------------------------

routes.post("/success", function(req, res , next ){
    count = {

        d1 : ( req.body.d1  != NaN)?  parseInt(req.body.d1):0,
        d2 : ( req.body.d2 != NaN)?  parseInt(req.body.d2):0,
        d3 : (  req.body.d3  != NaN)?  parseInt(req.body.d3):0,
        d4 : ( req.body.d4  != NaN )?  parseInt(req.body.d4):0,
        d5 : ( req.body.d5 != NaN)?  parseInt(req.body.d5):0,
        d6 : (req.body.d5  != NaN)?  parseInt(req.body.d6):0,
    }
    console.log(count);
    var max= []
    for (i=1;i<=6;i++){
        var sql='select current_price from  room_types where roomtypeid = (?) ;';
        db.query(sql, [i], function (err, data, fields) {
            if(err) throw err
            data .forEach(function(v){ max.push(parseInt(v.current_price)); })
        });
    }
    
   
    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(max);
        console.log(req.session.username)
        
        
        if(req.session.loggedIn){
            max= max.map(value => isNaN(value) ? 0 : value);
            req.session.total = max[0]+max[1]+max[2]+max[3]+max[4]+max[5];
            
            console.log(req.session.total);
            res.render('payment.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
    
    
            setTimeout( function2, 2000);
        
});


module.exports=routes;