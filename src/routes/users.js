// src/routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/login', usersController.login);
router.get('/:id/progreso', usersController.getProgreso);

module.exports = router;
