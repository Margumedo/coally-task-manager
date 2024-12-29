
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Ejemplo: Header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token format'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Puedes adjuntar info decodificada al request para uso posterior
        req.user = decoded;
        // decoded contiene { userId, email, iat, exp }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid or has expired'
        });
    }
};

module.exports = authMiddleware;
