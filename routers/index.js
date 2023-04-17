const productosBd = require("../models/productos.js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

// const express = require("express");
const router = express.Router();

// Configuración de Multer para guardar las imagenes en el proyecto
const multer = require("multer");
const { type } = require("express/lib/response.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/uploads/");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const nombreArchivo =
      req.body.nombre.replace(/\s+/g, "-") + "." + extension;
    cb(null, nombreArchivo);
  },
});
const upload = multer({ storage: storage });

//declarar array de objeto
producto ={

}

router.get("/", (req, res) => {
  res.render("index.html");
});

router.get("/signup", (req, res) => {
  res.render("signup.html");
});

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

router.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/productos.html'));
});

router.post('/admin', (req, res) => {
  const { usuario, contraseña } = req.body;
  
  if (usuario === 'admin' && contraseña === 'admin') {
    // Credenciales válidas, redirige a la página de inicio.
    res.redirect('../productosBd');
  } else {
    // Credenciales inválidas, vuelve a la página de inicio de sesión.
    res.redirect('/admin');
  }
});

router.get('/productosBd', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/productosBd.html')); 
});

router.get('/nosotros.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/nosotros.html'));
});

router.get('/contacto.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contacto.html'));
});

router.get('/productos.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/productos.html'));
});

router.post("/insertar", upload.single("imagen"), function (req, res) {

  console.log('Entro al post');
  const ArchivoImagen = req.file.filename;
  const Imagen = "./img/uploads/" + ArchivoImagen;


    console.log('Petición recibida en la ruta /insertar');
    producto = {
      descripcion: req.body.descripcion,
      nombre: req.body.nombre,
      precio: req.body.precio,
      estado: req.body.estado,
      imagen: Imagen,
    };

      try {
        productosBd.insertar(producto)
          .then((resultado) => {
                    res.send(`<html><head><title>Respuesta del servidor</title></head><body>
                    <h3> Se Agrego El Producto Con Exito
        <script>
            setTimeout(function() {
              window.close();
            }, 2500);
          </script>
        </body></html>`);
          })
          .catch((error) => {
            res.status(500).send("Error al agregar el producto");
          });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error al activar o desactivar el producto.");
      }
    
    // console.log(producto);
    //  const resultado = await productosBd.insertar(producto);
    // res.json(resultado);
  });
  



router.get("/mostrarTodos", async (req, res) => {
  const resultado = await productosBd.mostrarTodos();
  res.send(resultado);
});

router.delete('/borrar/:id', (req, res) => {
  const id = req.params.id;
  productosBd
    .borrar(id)
    .then((data) => {
      if (data.deletedCount === 0) {
        res.status(404).send('No se encontró el id');
      } else {
        res.json(data);
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

router.get('/buscarId/:id', function(req, res) {
  var id = req.params.id;
  productosBd.buscarId(id)
    .then((producto) => {
      res.json(producto);
    })
    .catch((error) => {
      console.error('error al buscar producto:', error);
      alert('error al buscar producto');
    });
});

router.put('/actualizar/:id', function(req, res) {
  var id = req.params.id;
  var producto= req.body;
  productosBd.actualizar(id, producto)
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error al actualizar el alumno' });
    });
});


// ----------------------------------------------------------------
// Post para crear un usuario nuevo
router.post("/crearUsuario", async (req, res) => {
  let username = req.body.username;
  let contraseña = req.body.contraseña;
  let telefono = req.body.telefono;
  let domicilio = req.body.domicilio;
  let email = req.body.email;

  productosBd.crearUsuario(
    username,
    contraseña,
    telefono,
    domicilio,
    email
  )
    .then(() => {
      // Usuario creado con éxito
      res.send(`Usuario creado con éxito`);
    })
    .catch((error) => {
      // Manejar errores
      console.error("Error al crear usuario:", error);

      // Verificar si el error es de duplicidad de valores (código de error 1062)
      if (error.errno == 1062) {
        // Enviar mensaje de error al cliente
        res.status(500).send(`El nombre de usuario '${username}' ya existe`);
      } else {
        // Enviar mensaje de error genérico al cliente
        res.status(500).send(`Error al crear usuario: ${error.message}`);
      }
    });
});

// Post para Iniciar Sesión
router.post("/iniciarSesion", async (req, res) => {
  let username = req.body.username;
  let contraseña = req.body.contraseña;

  productosBd.iniciarSesion(username, contraseña)
    .then((resultados) => { // Cambiar el nombre de la variable res a resultados
      // Usuario creado con éxito
      res.json(resultados); // Usar la variable resultados como resultado
    })
    .catch((error) => {
      // Manejar errores
      console.error("Error al iniciar sesión:", error);
      res.status(500).send("Nombre de usuario o contraseña incorrectos");
    });
});

// RUTAS PARA EL CARRITO

router.get("/buscarIDVentas", async (req, res) => {
  try {
    resultado = await productosBd.buscarIDVentas();
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el ID.");
  }
});

router.get("/buscarProductoPorId", async (req, res) => {
  const ID = req.query.ID;
  try {
    resultado = await productosBd.buscarProductoPorId(ID);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la lista de productos.");
  }
});

//RUTA PARA REALIZAR LA VENTA EN EL CARRITO
router.post("/realizarVenta", async (req, res) => {
  try {
    await productosBd.crearVenta(req.body.usuarioId);
    await productosBd.realizarVenta(
      req.body.idVenta,
      req.body.productos,
      req.body.metodoPago
    );
    res.send(`Compra Realizada Con Éxito`);
  } catch (error) {
    console.error("Error en la compra:", error);
    res.status(500).send("Error en la compra");
  }
});

module.exports = router;