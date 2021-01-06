const express = require('express');
const routes = express.Router()
var db=require('../db/data');

routes.get("/payment", function(req, res){
    res.render("payment.ejs"); 
});

routes.post("/mockpay", function(req, res , next ){
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
        max= max.map(value => isNaN(value) ? 0 : value);
        req.session.rooms=max;
        max[0] *=  count.d1;
        max[1] *= count.d2;
        max[2] *= count.d3;
        max[3] *= count.d4;
        max[4] *= count.d5;
        max[5] *= count.d6;
        console.log(max);
        if(req.session.loggedIn){
            max= max.map(value => isNaN(value) ? 0 : value);
            req.session.total = max[0]+max[1]+max[2]+max[3]+max[4]+max[5];
            
            console.log(req.session.total);
            res.render('mockpay.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
            setTimeout( function2, 3000);
        
});

routes.post("/bookedroom", function(req, res , next ){
    count = {

        order_id : ( req.body.orderid  != NaN)?  req.body.orderid:"",
        payment_id : ( req.body.payid != NaN)?  req.body.payid:"",
        singler : req.session.rooms[0],
        doubler : req.session.rooms[1],
        tripler : req.session.rooms[2],
        studio : req.session.rooms[3],
        executive_s : req.session.rooms[4],
        presedential_s : req.session.rooms[5],    
        amount : req.session.total
    }
    console.log(count);

    var sql = 'INSERT INTO order_table (order_id,payment_id,singler,doubler,tripler,studio,executive_s,presedential_s,amount) VALUES(?,?,?,?,?,?,?,?,?)';
    
    db.query(sql,[count.order_id,count.payment_id,count.singler,count.doubler,count.tripler,count.studio,count.executive_s,count.presedential_s,count.amount], function (err, data) {
      if (err) throw err;
    });
    
   
    function function2() {
        // all the stuff you want to happen after that pause
        console.log('finally');
        console.log(count);
        console.log(req.session.username)
        
        if(req.session.loggedIn){
            console.log(req.session.total);
            res.render('mockpay.ejs',{total:req.session.total})
        }else{
            res.redirect('/login');
        }
      
    }
    
    
            setTimeout( function2, 5000);
        


});




module.exports=routes;