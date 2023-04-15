const  json = require('express/lib/response');
const { connect, query } = require('./conexion.js');
const promise =  require('./conexion.js');
const conexion = require('./conexion.js'); 
const router = require('../router/index.js');
const {Route} = require('router');
var productosBd = {};
module.exports = productosBd;

productosBd.insertar = function insertar(producto){
  return new Promise((resolve,reject)=>{
      var sqlConsulta = "insert into producto set ?";
      conexion.query(sqlConsulta, producto, function(err,res){
          if(err){
              console.log("surgió un error" + err.message);
              reject(err);
          }else{
              resolve({
                id: producto.id,
                descripcion: producto.descripcion,
                nombre: producto.nombre,
                precio: producto.precio,
                estado: producto.estado,
                imagen: producto.imagen
              })
          }
      })
  })
}

productosBd.mostrarTodos = function mostrarTodos() {
  return new Promise((resolve, reject) => {
    var sqlConsulta = "select * from producto";
    conexion.query(sqlConsulta, null, function (err, res) {
      if (err) {
        console.log("Surgió un error " + err.message);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

//buscar alumno por matricula
productosBd.buscarId = function buscarId(id){
return new Promise((resolve,reject)=>{
  var sqlConsulta = "SELECT * FROM producto WHERE id = ?";
  conexion.query(sqlConsulta, [id], function(err, res){
    if(err){
      console.log("Surgió un error " + err.message);
      reject(err);
    } else {
      if(res.length > 0){
        resolve(res[0]); // Devuelve solo el primer resultado
      } else {
        reject(new Error(`No se encontró un producto con id ${id}`));
      }
    }
  });
});
}

//borrar el alumno 
productosBd.borrar = function borrar(id) {
  return new Promise((resolve, reject) => {
    productosBd.buscarId(id)
      .then(producto => {
        conexion.query('DELETE FROM producto WHERE id = ?', [id], function(err, res) {
          if (err) {
            console.log('Surgió un error ' + err.message);
            reject(err);
          } else {
            resolve({ message: `User where id = ${id} deleted succesfully.` });
          }
        });
      })
      .catch(err => reject(err));
  });
};

productosBd.actualizar = function(id, producto) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE producto SET descripcion = ?, nombre = ?, precio = ?, estado = ?, imagen = ? WHERE id = ?';
    const params = [producto.descripcion, producto.nombre, producto.precio, producto.estado, producto.imagen, id];
    conexion.query(sql, params, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(`producto con id ${id} actualizado correctamente.`);
      }
    });
  });
};

  

  
  

  

  
  
  