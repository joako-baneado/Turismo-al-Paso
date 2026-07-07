// src/controllers/visitasController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getDistance } = require('../utils/haversine');

// Registrar una visita
async function registrarVisita(req, res) {
  try {
    const { usuarioId, hitoId, userLat, userLon, metodoVerificacion } = req.body;

    if (!usuarioId || !hitoId || !metodoVerificacion) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos (usuarioId, hitoId, metodoVerificacion).' });
    }

    // 1. Verificar si el usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    });
    if (!usuario) {
      return res.status(444).json({ error: 'Usuario no encontrado.' });
    }

    // 2. Verificar si el hito existe
    const hito = await prisma.hito.findUnique({
      where: { id: parseInt(hitoId) }
    });
    if (!hito) {
      return res.status(404).json({ error: 'Hito no encontrado en el catálogo.' });
    }

    // 3. Verificar si el hito ya fue visitado por este usuario
    const visitaExistente = await prisma.visita.findUnique({
      where: {
        usuarioId_hitoId: {
          usuarioId: parseInt(usuarioId),
          hitoId: parseInt(hitoId)
        }
      }
    });

    if (visitaExistente) {
      return res.status(400).json({ error: 'Ya has visitado y desbloqueado este hito anteriormente.' });
    }

    let distancia = null;

    // 4. Validar método de verificación
    if (metodoVerificacion === 'GPS') {
      if (userLat === undefined || userLon === undefined) {
        return res.status(400).json({ error: 'Coordenadas del usuario (userLat, userLon) requeridas para validación por GPS.' });
      }

      // Calcular distancia en metros usando Haversine
      distancia = getDistance(
        parseFloat(userLat),
        parseFloat(userLon),
        hito.lat,
        hito.lon
      );

      // Validar si está dentro del radio configurado (o 100m por defecto)
      const radio = hito.radioDesbloqueo || 100.0;
      if (distancia > radio) {
        return res.status(400).json({
          error: 'Fuera de rango geográfico.',
          distancia: Math.round(distancia),
          radioMaximo: radio
        });
      }
    } else if (metodoVerificacion === 'FOTO') {
      // Validación por foto simula aprobación (Fact-checking de contingencia)
      console.log(`Visita para hito ${hito.id} verificada por contingencia de fotografía.`);
    } else {
      return res.status(400).json({ error: 'Método de verificación no soportado (debe ser GPS o FOTO).' });
    }

    // 5. Crear el registro de visita
    const nuevaVisita = await prisma.visita.create({
      data: {
        usuarioId: parseInt(usuarioId),
        hitoId: parseInt(hitoId),
        verificadoCon: metodoVerificacion
      }
    });

    // 6. Actualizar XP y Nivel de Usuario
    let xpActual = usuario.xp + hito.xp;
    let nivelActual = usuario.nivel;
    let subioDeNivel = false;

    // Fórmula de nivelación: sube nivel si el XP acumulado es mayor o igual a nivel * 400
    while (xpActual >= nivelActual * 400) {
      nivelActual += 1;
      subioDeNivel = true;
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        xp: xpActual,
        nivel: nivelActual
      }
    });

    return res.status(200).json({
      success: true,
      mensaje: '¡Hito desbloqueado con éxito!',
      visita: nuevaVisita,
      distancia: distancia !== null ? Math.round(distancia) : null,
      xpGanado: hito.xp,
      nuevoXp: xpActual,
      nuevoNivel: nivelActual,
      subioDeNivel: subioDeNivel,
      hito: {
        id: hito.id,
        nombre: hito.nombre,
        descripcionCompleta: hito.descripcionCompleta
      }
    });

  } catch (error) {
    console.error('Error al registrar visita:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = {
  registrarVisita
};
