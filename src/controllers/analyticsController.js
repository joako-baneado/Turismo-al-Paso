// src/controllers/analyticsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registrar ubicación anónima en segundo plano (cumplimiento Ley N° 29733)
async function logPing(req, res) {
  try {
    const { lat, lon, sessionId } = req.body;

    if (lat === undefined || lon === undefined || !sessionId) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos (lat, lon, sessionId).' });
    }

    // Guardar registro de geolocalización completamente disociado de identidades físicas
    const ping = await prisma.registroUbicacionAnonimo.create({
      data: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        sessionId: sessionId.trim()
      }
    });

    return res.status(201).json({ success: true, message: 'Ping registrado con éxito.' });
  } catch (error) {
    console.error('Error al registrar ping analítico:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// Obtener datos agregados para mapas de calor (Heatmaps)
async function getHeatmap(req, res) {
  try {
    const pings = await prisma.registroUbicacionAnonimo.findMany({
      select: {
        lat: true,
        lon: true
      }
    });

    // Agrupamiento por coordenadas redondeadas a 4 decimales (~11 metros de precisión)
    // Esto reduce el ruido y permite un agrupamiento eficiente para visualizadores de mapas
    const grupos = {};

    pings.forEach(ping => {
      const latRedondeada = Number(ping.lat.toFixed(4));
      const lonRedondeada = Number(ping.lon.toFixed(4));
      const key = `${latRedondeada},${lonRedondeada}`;

      if (!grupos[key]) {
        grupos[key] = {
          lat: latRedondeada,
          lon: lonRedondeada,
          weight: 0
        };
      }
      grupos[key].weight += 1;
    });

    const datosCalor = Object.values(grupos);

    return res.status(200).json(datosCalor);
  } catch (error) {
    console.error('Error al generar mapa de calor:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = {
  logPing,
  getHeatmap
};
