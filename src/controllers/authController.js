
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validaciones mínimas
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        // Verifica si el email ya existe en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }
        // Crear usuario en BD
        const user = await User.create({ email, password });
        return res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {

        if (error.code === 11000 && error.keyValue?.email) {
            // Manejo del error de clave duplicada
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validaciones mínimas
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Verificar contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        return res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        next(error);
    }
};


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password');
        // '-password' para omitir el campo password de la respuesta
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};