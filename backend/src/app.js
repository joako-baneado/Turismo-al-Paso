// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Log de peticiones simple para depuración
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Importar enrutadores
const usersRoutes = require('./routes/users');
const hitosRoutes = require('./routes/hitos');
const visitasRoutes = require('./routes/visitas');
const analyticsRoutes = require('./routes/analytics');

// Registrar rutas de la API REST
app.use('/api/users', usersRoutes);
app.use('/api/hitos', hitosRoutes);
app.use('/api/visitas', visitasRoutes);
app.use('/api/analytics', analyticsRoutes);

// Endpoint raíz de verificación / salud
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'API REST - Turismo Histórico Lima Metropolitana',
    version: '1.0.0',
    status: 'ONLINE',
    distritosPiloto: ['Pueblo Libre', 'Rímac', 'San Juan de Lurigancho']
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no controlado en la aplicación:', err.stack);
  res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
});

module.exports = app;
