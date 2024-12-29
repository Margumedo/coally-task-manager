/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ad129f1f1b2c1234567890
 *         title:
 *           type: string
 *           example: "Nueva tarea"
 *         description:
 *           type: string
 *           example: "Descripción de la tarea"
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-05T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-05T15:00:00.000Z"
 *
 *     CreateTaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: "Tarea de ejemplo"
 *         description:
 *           type: string
 *           example: "Descripción corta de la tarea"
 *         completed:
 *           type: boolean
 *           default: false
 *
 *     UpdateTaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *
 *   responses:
 *     TaskNotFound:
 *       description: No se encontró la tarea solicitada
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Task not found"
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');

const authMiddleware = require('../middlewares/authMiddleware');



/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación en los campos de la tarea
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    '/', authMiddleware,
    [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
    ],
    validateRequest,
    taskController.createTask
);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Obtener la lista de tareas
 *     description: Retorna un arreglo con todas las tareas. Permite filtrar por estado.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [completed, pending]
 *         required: false
 *         description: Filtra tareas por estado (completed o pending).
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida con éxito
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
 *                     $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware, taskController.getTasks);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener el detalle de una tarea
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la tarea a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve el objeto de la tarea solicitada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         $ref: '#/components/responses/TaskNotFound'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authMiddleware, taskController.getTaskById);

/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la tarea a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         $ref: '#/components/responses/TaskNotFound'
 *       500:
 *         description: Error interno del servidor
 */
router.put(
    '/:id', authMiddleware,
    [
        body('title')
            .optional()
            .notEmpty()
            .withMessage('Title cannot be empty if provided')
    ],
    validateRequest,
    taskController.updateTask
);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la tarea a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       404:
 *         $ref: '#/components/responses/TaskNotFound'
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
