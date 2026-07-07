// src/index.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('==================================================');
  console.log(` Servidor de Turismo Histórico Iniciado`);
  console.log(` Escuchando en el puerto: ${PORT}`);
  console.log(` URL de acceso: http://localhost:${PORT}`);
  console.log(` Dirección LAN para pruebas móviles: http://0.0.0.0:${PORT}`);
  console.log('==================================================');
});
