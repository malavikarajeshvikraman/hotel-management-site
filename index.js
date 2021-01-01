const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var registrationRouter = require('./routes/registration');
const routes = require('./routes/routes');
const sqlcon = require('./routes/sql');

var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', registrationRouter);
app.use(routes);
app.use('/api/users',sqlcon);

var Razorpay=require("razorpay");
var bodyParser = require('body-parser')

let instance = new Razorpay({
    key_id: 'rzp_test_u7Pw0KKUBrwYsc', // your `KEY_ID`
    key_secret: 'H6qaokUp8bv5KPbfW900Ml7z' // your `KEY_SECRET`
})
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/payment/order",(req,res)=>{
    params=req.body;
    instance.orders.create(params).then((data) => {
           res.send({"sub":data,"status":"success"});
    }).catch((error) => {
           res.send({"sub":error,"status":"failed"});
    })
});

app.post("/api/payment/verify",(req,res)=>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'H6qaokUp8bv5KPbfW900Ml7z')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature)
     response={"status":"success"}
        res.send(response);
});

app.use(cookieParser())
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))


app.use(express.static('public'));


app.listen(3000, () => console.log('Example app listening on port 3000!'));