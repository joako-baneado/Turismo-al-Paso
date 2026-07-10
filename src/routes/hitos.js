// src/routes/hitos.js
const express = require('express');
const router = express.Router();
const hitosController = require('../controllers/hitosController');

router.get('/', hitosController.getAllHitos);
router.get('/:id', hitosController.getHitoById);

module.exports = router;
