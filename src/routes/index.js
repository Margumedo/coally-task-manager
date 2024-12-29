
const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');

// Rutas de autenticación
router.use('/auth', authRoutes);

// Usar rutas
router.use('/tasks', taskRoutes);

module.exports = router;
