
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Ejemplo de detección de tipo de error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Manejo de otras excepciones
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};

module.exports = errorHandler;
