
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.get('/', (req, res) => {
    res.redirect('/api-docs');
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:4000', 'https://coally-task-manager.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    // credentials: true
}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use('/api', routes);

// Manejo de errores global
app.use(errorHandler);

module.exports = app;
