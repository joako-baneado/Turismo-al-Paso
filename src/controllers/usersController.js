// src/controllers/usersController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Login / Registration simple
async function login(req, res) {
  try {
    const { username } = req.body;
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'El nombre de usuario es requerido.' });
    }

    const trimmedUsername = username.trim();

    // Buscar si ya existe
    let usuario = await prisma.usuario.findUnique({
      where: { username: trimmedUsername }
    });

    // Si no existe, crearlo
    if (!usuario) {
      usuario = await prisma.usuario.create({
        data: { username: trimmedUsername }
      });
      console.log(`Nuevo usuario creado: ${trimmedUsername}`);
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// Obtener progreso del usuario
async function getProgreso(req, res) {
  try {
    const usuarioId = parseInt(req.params.id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: 'ID de usuario inválido.' });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: {
        visitas: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const totalHitos = await prisma.hito.count();
    const hitosVisitados = usuario.visitas.length;
    const hitosBloqueados = totalHitos - hitosVisitados;

    return res.status(200).json({
      id: usuario.id,
      username: usuario.username,
      xp: usuario.xp,
      nivel: usuario.nivel,
      createdAt: usuario.createdAt,
      stats: {
        totalHitos,
        hitosVisitados,
        hitosBloqueados
      }
    });
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = {
  login,
  getProgreso
};
