const productosBd = require("../models/productos.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require('path');



module.exports = router;

//declarar array de objeto
producto ={

}

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

router.get("/", (req,res)=>{
  res.render('index.html');
})

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
   const resultado = await productosBd.insertar(producto);
  res.json(resultado);
});


router.get("/", (req,res)=>{
res.render('index.html');
})

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











// router.get("/tabla",(req,res)=>{
//     const params ={
//         numero:req.query.numero
//     }
//     res.render('tabla.html', params);
// })

// router.get("/cotizacion",(req,res)=>{
//     const params ={
//         valor:req.query.valor,
//         plazo:req.query.plazo,
//         pinicial:req.query.pinicial
//     }
//     res.render('cotizacion.html', params);
// })

// router.post('/tabla',(req,res)=>{
//     const params ={
//         numero:req.body.numero
//     }
//     res.render('tabla.html', params);
// })