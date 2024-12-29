# 🛠️ Task Manager API

🚀 **Task Manager API** es una API diseñada para gestionar tareas y usuarios. Incluye un sistema de autenticación basado en JWT y documentación interactiva con Swagger UI.

---

## 📑 **Índice**
1. [Características](#-características)
2. [Requisitos previos](#-requisitos-previos)
3. [Configuración](#-configuración)
4. [Uso](#-uso)
5. [Rutas principales](#-rutas-principales)
6. [Swagger UI](#-swagger-ui)
7. [Contribución](#-contribución)

---

## ✨ **Características**

✅ **CRUD de tareas:**  
- Crear, leer, actualizar y eliminar tareas.  
- Filtro por estado (completado/pendiente).  

✅ **Gestión de usuarios:**  
- Registro y login con autenticación JWT.  

✅ **Swagger UI:**  
- Documentación interactiva accesible en `/api-docs`.  

✅ **Validaciones robustas:**  
- Verificación de email único y formato válido.  

✅ **Manejo de errores estructurado:**  
- Respuestas claras con códigos de error estándar (`400`, `409`, `500`).

---

## 💻 **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión >= 14)
- **MongoDB** (local o en la nube)
- **Git**

---

## 🛠️ **Configuración**

### 1️⃣ **Clona este repositorio**

```bash
git clone https://github.com/tu-usuario/task-manager-api.git
cd task-manager-api
```

### 2️⃣ Instala las dependencias


```bash
npm install
```

3️⃣ Configura las variables de entorno

```bash
PORT=4000
MONGODB_URI=mongodb://<usuario>:<contraseña>@localhost:27017/taskmanagerdb
JWT_SECRET=superSecretKey123
```

4️⃣ Inicia el servidor


```bash
npm run dev
```

El servidor estará disponible en http://localhost:4000.


---
## 📚 **Uso** 
### 🟢 Registro de usuarios

Endpoint:
`POST /api/auth/register`

Ejemplo de cuerpo de solicitud:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

## 🔑 Inicio de sesión

**Endpoint:**  
`POST /api/auth/login`

**Ejemplo de cuerpo de solicitud:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
}
```
--- 
## 📜 Rutas principales

| **Método** | **Endpoint**          | **Descripción**                           |
|------------|-----------------------|-------------------------------------------|
| POST       | `/api/auth/register`  | Registra un nuevo usuario.                |
| POST       | `/api/auth/login`     | Inicia sesión y obtiene un token JWT.     |
| GET        | `/api/tasks`          | Obtiene todas las tareas (protegido).     |
| POST       | `/api/tasks`          | Crea una nueva tarea (protegido).         |
| PUT        | `/api/tasks/:id`      | Actualiza una tarea (protegido).          |
| DELETE     | `/api/tasks/:id`      | Elimina una tarea (protegido).            |


---
## 🧩 Swagger UI

La documentación interactiva está disponible en:  
[http://localhost:4000/api-docs](http://localhost:4000/api-docs)

Sin embargo al visitar la raiz te redirigira a la documentación.

1. **Autoriza con tu token JWT**:
   - Haz clic en el botón `Authorize`.
   - Ingresa tu token en el formato: `Bearer <tu-token>`.

2. **Explora las rutas protegidas y realiza pruebas directamente**.
---

### 🚀 ¡Gracias por usar Task Manager API!

<div align="center">
---
💻 Con ❤️ por Maicol Arguemdo 🧑🏻‍💻
---
</div> 

