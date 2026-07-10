// src/routes/analytics.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/ping', analyticsController.logPing);
router.get('/heatmap', analyticsController.getHeatmap);

module.exports = router;
