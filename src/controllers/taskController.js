
const Task = require('../models/Task');

// Crea una nueva tarea
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;

        const newTask = await Task.create({ title, description, completed });
        return res.status(201).json({
            success: true,
            data: newTask
        });
    } catch (error) {
        next(error);
    }
};

// Obtiene la lista de tareas con filtro por estado (completed o pending)
exports.getTasks = async (req, res, next) => {
    try {
        const { status } = req.query; // status = 'completed' o 'pending'
        let filter = {};

        if (status === 'completed') {
            filter.completed = true;
        } else if (status === 'pending') {
            filter.completed = false;
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

// Obtiene el detalle de una tarea por su ID
exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

// Actualiza una tarea por su ID
exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedTask
        });
    } catch (error) {
        next(error);
    }
};

// Elimina una tarea por su ID
exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
