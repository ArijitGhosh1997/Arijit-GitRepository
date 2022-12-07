const mySql = require ('mysql');
//mysql Connection
var myConnection = mySql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'testdb',
    insecureAuth : true
});

const connectDB = () => {
    myConnection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    
}
module.exports ={ connectDB, myConnection };
