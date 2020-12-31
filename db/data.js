const mysql =require('mysql');
const pool = mysql.createPool({
    connectionList:10,
    password:'12345',
    user:'root',
    database:'hotel',
    host:'localhost',
    port:'3306'

})

let userdb = {};

userdb.all = () => {

    return new Promise ((resolve,reject) => {

        pool.query(`SELECT * FROM users`,(err,results) => {
            if(err){
                return reject(err)
            }
            return resolve(results);
        });
    });
};

module.exports = userdb;