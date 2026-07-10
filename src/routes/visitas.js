// src/routes/visitas.js
const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitasController');

router.post('/registrar', visitasController.registrarVisita);

module.exports = router;
