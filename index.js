const express = require('express');
const app = express();


app.get("/", function(req, res){
    res.render("homepage.ejs"); //Every EJS file must be in the views folder. EJS is our view engine
});
 
app.use(express.static('public'));

app.get("*", function(req, res){
    res.send("You went to a route that doesn't exist. Shame on you.");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));