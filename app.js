
// const bodyparser = require("body-parser");

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);

// Static files
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agregar este middleware para analizar datos de formularios


// Middlewares
app.use(morgan("dev"));
// app.use(
//   myConnection(
//     mysql,
//     {
//       host: "localhost",
//       user: "root",
//       password: "Gonquintana1m",
//       /*port: "3306",*/
//       database: "projectd",
//     },
//     "single"
//   )
// );

// Routers
const misRutas = require("./routers/index");
app.use(misRutas);

// Starting the server
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Iniciando servidor en puerto ${puerto}`);
});
