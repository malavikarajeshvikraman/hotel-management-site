const express = require('express');
const app = express();
const routes = require('./routes/routes');
const sqlcon = require('./routes/sql');
app.use(express.static('public'));
app.use(routes);
app.use('/api/users',sqlcon);



 
app.use(express.static('public'));


app.listen(3000, () => console.log('Example app listening on port 3000!'));