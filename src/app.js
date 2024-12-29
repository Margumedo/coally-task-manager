
const express = require('express');
// const cors = require('cors'); // Solo si requieres CORS, de lo contrario se omite
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
// app.use(cors()); // Habilita si requieres peticiones desde otros dominios

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use('/api', routes);

// Manejo de errores global
app.use(errorHandler);

module.exports = app;
