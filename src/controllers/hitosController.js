// src/controllers/hitosController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener catálogo de hitos (con candado lógico de contenido por usuario)
async function getAllHitos(req, res) {
  try {
    const usuarioId = parseInt(req.query.usuarioId);

    // Obtener todos los hitos
    const hitos = await prisma.hito.findMany();

    // Obtener las visitas del usuario si se proporciona usuarioId
    let visitasSet = new Set();
    if (!isNaN(usuarioId)) {
      const visitas = await prisma.visita.findMany({
        where: { usuarioId: usuarioId }
      });
      visitas.forEach(v => visitasSet.add(v.hitoId));
    }

    // Mapear hitos aplicando la seguridad del candado de información
    const hitosMapeados = hitos.map(hito => {
      const visitado = visitasSet.has(hito.id);

      return {
        id: hito.id,
        nombre: hito.nombre,
        tipo: hito.tipo,
        xp: hito.xp,
        lat: hito.lat,
        lon: hito.lon,
        radioDesbloqueo: hito.radioDesbloqueo,
        pista: hito.pista,
        visitado: visitado,
        // Candado de información: ocultar descripción detallada si no ha sido visitado
        descripcionCompleta: visitado 
          ? hito.descripcionCompleta 
          : "Visita este lugar físico para desbloquear su historia completa.",
        imagenUrl: visitado ? hito.imagenUrl : null
      };
    });

    return res.status(200).json(hitosMapeados);
  } catch (error) {
    console.error('Error al obtener hitos:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// Obtener detalle de un hito específico
async function getHitoById(req, res) {
  try {
    const hitoId = parseInt(req.params.id);
    const usuarioId = parseInt(req.query.usuarioId);

    if (isNaN(hitoId)) {
      return res.status(400).json({ error: 'ID de hito inválido.' });
    }

    const hito = await prisma.hito.findUnique({
      where: { id: hitoId }
    });

    if (!hito) {
      return res.status(404).json({ error: 'Hito no encontrado.' });
    }

    // Verificar si el usuario lo ha visitado
    let visitado = false;
    if (!isNaN(usuarioId)) {
      const visita = await prisma.visita.findUnique({
        where: {
          usuarioId_hitoId: {
            usuarioId: usuarioId,
            hitoId: hitoId
          }
        }
      });
      visitado = !!visita;
    }

    // Retornar detalle con candado lógico
    const respuesta = {
      id: hito.id,
      nombre: hito.nombre,
      tipo: hito.tipo,
      xp: hito.xp,
      lat: hito.lat,
      lon: hito.lon,
      radioDesbloqueo: hito.radioDesbloqueo,
      pista: hito.pista,
      visitado: visitado,
      descripcionCompleta: visitado 
        ? hito.descripcionCompleta 
        : "Visita este lugar físico para desbloquear su historia completa.",
      imagenUrl: visitado ? hito.imagenUrl : null
    };

    return res.status(200).json(respuesta);
  } catch (error) {
    console.error('Error al obtener detalle de hito:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = {
  getAllHitos,
  getHitoById
};
