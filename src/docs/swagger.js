const swaggerJsdoc = require('swagger-jsdoc');


const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction
    ? 'https://coally-task-manager.onrender.com/' // URL de producción
    : 'http://localhost:4000'; // URL de desarrollo

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: "API para gestionar tareas y usuarios." + `
                
                ### Instrucciones:
                1. Cree un usuario utilizando la ruta **POST /api/auth/register** enviando un email y una contraseña.
                2. Inicie sesión con la ruta **POST /api/auth/login** para obtener un token JWT.
                3. Copie el token generado y haga clic en el botón **Authorize** en esta documentación.
                4. Una vez autenticado, podrá utilizar las rutas protegidas, como las relacionadas al manejo de tareas (CRUD).
                
                **Nota:** Algunas rutas como el registro de usuario y consulta de usuarios no requieren autenticación.
            `,
            contact: {
                name: 'Soporte API',
                email: 'margumedo.sm@gmail.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: serverUrl,
                description: isProduction
                    ? 'Servidor de Producción'
                    : 'Servidor de Desarrollo'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Autenticación mediante token JWT. Proporcione el token en el encabezado Authorization como "Bearer <token>".'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Archivos donde Swagger buscará anotaciones para documentar las rutas
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
