/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64ad129f1f1b2c1234567890"
 *         email:
 *           type: string
 *           example: "test@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-05T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-05T14:50:00.000Z"
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const authController = require('../controllers/authController');

// POST /api/auth/register
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "email"
 *                       message:
 *                         type: string
 *                         example: "Must be a valid email address"
 *       409:
 *         description: Email ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email already registered"
 *       500:
 *         description: Error interno
 */
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Must be a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
    validateRequest,
    authController.register
);

// POST /api/auth/login
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Retorna el token JWT
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Must be a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],
    validateRequest,
    authController.login
);

/**
 * GET /api/auth/users - Obtener lista de usuarios
 * Protegido con authMiddleware
 */

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     description: Devuelve la lista de todos los usuarios registrados (sin el campo password).
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/users', authController.getAllUsers);

module.exports = router;
