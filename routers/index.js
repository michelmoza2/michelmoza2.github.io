const productosDb = require("../models/productos.js");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
router.use(bodyParser.json());
// const productosController = require('../controllers/productosControllers.js');

module.exports = router;

router.get("/index.html", (req,res)=>{
  res.render('index.html');
});

router.get('/nosotros.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/nosotros.html'));
});

router.get('/contacto.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contacto.html'));
});

//router.get('/', productosController.list);
producto ={

}

router.post("/insertar", async (req, res) => {
  console.log('Petición recibida en la ruta /insertar');
  producto = {
    id: req.body.id,
    descripcion: req.body.descripcion,
    nombre: req.body.nombre,
    precio: req.body.precio,
    estado: req.body.estado,
    imagen: req.body.imagen,
  };
  console.log(producto);
  try {
    const resultado = await productosDb.insertar(producto);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al insertar el producto en la base de datos.");
  }
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
      res.redirect('/productosBd');
    } else {
      // Credenciales inválidas, vuelve a la página de inicio de sesión.
      res.redirect('/admin');
    }
  });

  router.get('/productosBd', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productosBd.html')); 
  });

router.get("/mostrarTodos", async (req, res) => {
  const resultado = await productosDb.mostrarTodos();
  res.send(resultado);
});

router.delete('/borrar/:id', (req, res) => {
  const id = req.params.id;
  productosDb
    .borrar(id)
    .then((data) => {
      if (data.deletedCount === 0) {
        res.status(404).send('Id inexistente');
      } else {
        res.json(data);
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

router.get('/buscarId/:id', function(req, res) {
  var id = req.params.id;
  productosDb.buscarId(id)
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
  productosDb.actualizar(id, producto)
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error al actualizar el producto' });
    });
});

router.get("/mostrarProductos", async (req, res) => {
  const resultado = await productosDb.mostrarProductos();
  res.send(resultado);
});