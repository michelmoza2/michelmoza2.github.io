const productosDb = require("../models/productos.js");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
router.use(bodyParser.json());
// const productosController = require('../controllers/productosControllers.js');

//router.get('/', productosController.list);
productos ={

}

router.get("/", (req,res)=>{
    res.render('index.ejs');
  });
  
  router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
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
  


router.post("/insertar", async (req, res) => {
    console.log('Petición recibida en la ruta /insertar');
    productos = {
        id: req.body.id,
        descripcion: req.body.descripcion,
        nombre: req.body.nombre,
        precio: req.body.precio,
        estado: req.body.estado,
        imagen: req.body.imagen,
    };
    
    console.log(productos);
     const resultado = await productosDb.insertar(productos);
    res.json(resultado);
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
    .then((productos) => {
      res.json(productos);
    })
    .catch((error) => {
      console.error('error al buscar producto:', error);
      res.status(500).send('error al buscar producto');
    });
});

router.put('/actualizar/:id', function(req, res) {
  var id = req.params.id;
  var productos= req.body;
  productosDb.actualizar(id, productos)
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error al actualizar el producto' });
    });
});
  module.exports = router;