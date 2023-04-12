const mysql = require("mysql2");
var sqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    database:"projectd"
});

sqlConnection.connect(function (err){
    if(err){
        console.log("Error al intentar conectarse" + err);
    }else{
        console.log("Conexión exitosa");
    }
});



module.exports = sqlConnection;