const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");

const misRutas = require("./router/index");
const path = require("./node_modules/path");
//app.engine("html", require("ejs").renderFile);
//app.use(express.static('/public'));




const app = express(); //OBJETO PRINCIPAL DE LA APLICACION
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')); 
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json())

//cambiar extensiones a ejs a html
app.engine("html", require("ejs").renderFile);

app.use(misRutas);


// la pagina del error va al final de los get / post 
app.use((req,res,next)=>{
res.status(404).sendFile(__dirname + '/public/error.html')
})


const puerto = 3000;  
app.listen(puerto, ()=>{    //La aplicacion va a escuchar por el puerto 3000
    console.log("Iniciando puerto");
});
