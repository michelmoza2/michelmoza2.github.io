const express = require('express');
const router = express.Router();
const productosControllers = require('../controllers/productosControllers');

router.get('/', productosControllers.list);

module.exports = router;