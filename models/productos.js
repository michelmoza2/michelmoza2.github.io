const  json = require('express/lib/response');
const { connect, query } = require('./conexion.js');
const promise =  require('./conexion.js');
const conexion = require('./conexion.js'); 
const router = require('../routers/index.js');
//const {Route} = require('router');
var productosBd = {};


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
    const sql = 'UPDATE producto SET descripcion = ?, nombre = ?, precio = ?, estado = ? WHERE id = ?';
    const params = [producto.descripcion, producto.nombre, producto.precio, producto.estado, id];
    conexion.query(sql, params, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(`producto con id ${id} actualizado correctamente.`);
      }
    });
  });
};

//PARA CREAR UN USUARIO
productosBd.crearUsuario = function crearUsuario( username, contraseña, telefono, domicilio, email ) {
  return new Promise((resolve, reject) => {
    // Se define la consulta SQL para realizar corte de caja
    var sqlConsulta =
      "INSERT INTO usuarios (Nombre, Contrasena, Telefono, Domicilio, Correo) VALUES (?, ?, ?, ?, ?)";
    conexion.query(
      sqlConsulta,
      [username, contraseña, telefono, domicilio, email],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

//PARA INICIAR SESION
productosBd.iniciarSesion = function iniciarSesion(username, contraseña) {
  return new Promise((resolve, reject) => {
    // Se define la consulta SQL para realizar la consulta de inicio de sesión
    var sqlConsulta =
      "SELECT ID,Nombre FROM usuarios WHERE Nombre = ? AND Contrasena = ?";
    conexion.query(sqlConsulta, [username, contraseña], function (err, res) {
      if (err) {
        reject(err);
      } else {
        if (res.length > 0) {
          // Los datos coinciden, el usuario existe y la sesión se inicia
          resolve(res);
        } else {
          // Los datos no coinciden, el usuario no existe o la contraseña es incorrecta
          reject("Nombre de usuario o contraseña incorrectos");
        }
      }
    });
  });
};
  

// FUNCIONES PARA EL CARRITO 

// Este es para saber que ID de ventas es el siguiente
productosBd.buscarIDVentas = function buscarIDVentas() {
  return new Promise((resolve, reject) => {
    conexion.query(
      "SELECT MAX(ID) as ultimoIDVenta FROM venta",
      function (error, resultados) {
        if (error) {
          reject(error);
        } else {
          resolve(resultados);
        }
      }
    );
  });
};

// Para mostrar buscar por ID (Carrito)
productosBd.buscarProductoPorId = function buscarProductoPorId(ID) {
  return new Promise((resolve, reject) => {
    // Se define la consulta SQL para realizar corte de caja
    var sqlConsulta = "SELECT * FROM producto WHERE ID = ?";
    conexion.query(sqlConsulta, [ID], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};


// LAS SIGUIENTES 2 SON PARA CREAR LA VENTA
productosBd.crearVenta = function crearVenta(UsuarioID) {
  return new Promise((resolve, reject) => {
    var sqlConsulta =
      "INSERT INTO venta (Fecha, Total, UsuarioID) VALUES (CURDATE(), 0, ?);";
    conexion.query(sqlConsulta, [UsuarioID], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
        console.log(res);
      }
    });
  });
};

// (Carrito)
productosBd.realizarVenta = function realizarVenta(idVenta, productos, metodoPago) {
  return new Promise((resolve, reject) => {
    var sqlConsulta = 
    "INSERT INTO detalleventa (VentaID, ProductoID, Precio, Subtotal, MetodoPago)VALUES (?, ?, ?, ?, ?);";
    productos.forEach((producto) => {
      conexion.query(
        sqlConsulta,
        [
          idVenta,
          producto.id,
          producto.precio,
          producto.precio,
          metodoPago,
        ],
        function (err, res) {
          if (err) {
            console.log("Surgió un error: ", err);
            reject(err);
          } else {
            console.log("Compra realizada");
            console.log(res);
          }
        }
      );
    });
    resolve();
  });
};
  
  
module.exports = productosBd;
