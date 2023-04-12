const  json = require('express/lib/response');
const { connect, query } = require('../models/conexion.js');
const conexion = require('../models/conexion.js'); 
//const router = require('../routers/index.js');
//const {Route} = require('router');

var productosDb = {};

module.exports = productosDb;
productosDb.insertar = function insertar(productos){
    return new Promise((resolve,reject)=>{
        var sqlConsulta = "insert into productos set ?";
        conexion.query(sqlConsulta, productos, function(err,res){
            if(err){
                console.log("surgió un error" + err.message);
                reject(err);
            }else{
                resolve({
                    id: productos.id,
                    descripcion: productos.descripcion,
                    nombre: productos.nombre,
                    precio: productos.precio,
                    estado: productos.estado,
                    imagen: productos.imagen
                })
            }
        })
    })
}

productosDb.mostrarTodos = function mostrarTodos() {
    return new Promise((resolve, reject) => {
      var sqlConsulta = "select * from productos";
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
productosDb.buscarId = function buscarId(id){
    return new Promise((resolve,reject)=>{
      var sqlConsulta = "SELECT * FROM productos WHERE id_producto = ?";
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
productosDb.borrar = function borrar(id) {
    return new Promise((resolve, reject) => {
        productosDb.buscarId(id)
        .then(productos=> {
          conexion.query('DELETE FROM productos WHERE id_producto = ?', [id], function(err, res) {
            if (err) {
              console.log('Surgió un error ' + err.message);
              reject(err);
            } else {
              resolve({ message: `User where matricula = ${id} deleted succesfully.` });
            }
          });
        })
        .catch(err => reject(err));
    });
  };

  productosDb.actualizar = function(id, productos) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE productos SET descripcion, nombre = ?, precio = ?, estado = ?, imagen = ? WHERE id = ?';
      const params = [productos.descripcion, productos.nombre, productos.precio, productos.estado, productos.imagen, id];
      conexion.query(sql, params, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(`Producto con matrícula ${id} actualizado correctamente.`);
        }
      });
    });
  };