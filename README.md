# 🐾 Patitas Conectadas

**Patitas Conectadas** es una red social especialmente diseñada para mascotas. Cada mascota puede tener su propio perfil, compartir sus pensamientos en forma de publicaciones, comentar lo que hacen sus amigos peludos y formar su propia comunidad online.

## 🎯 Objetivo del Proyecto

El objetivo de **Patitas Conectadas** es crear un espacio digital seguro y entretenido donde los animales puedan “interactuar” entre sí. A través de esta red social, buscamos fomentar la creatividad y el amor por los animales.

## 🧰 Tecnologías Usadas

Este proyecto backend fue desarrollado con una serie de herramientas modernas del ecosistema JavaScript, orientadas a la construcción de APIs robustas, seguras y escalables.

### 📝 Lenguaje y Entorno

- **JavaScript**
- **Node.js**

### ⚙️ Framework y Librerías Principales

- **Express 5.1.0** – Framework minimalista para el manejo de rutas y middlewares.
- **Mongoose 8.15.1** – ODM para **modelar y conectar** con MongoDB.
- **Bcryptjs 3.0.2** – Para el hash **seguro** de contraseñas.
- **Jsonwebtoken 9.0.2** – Para la autenticación mediante **tokens** JWT.
- **Multer 2.0.1** – Para el manejo de archivos subidos (usado en conjunto con un middleware personalizado en `uploads/`).
- **Nodemailer 7.0.3** – Para el envío de correos electrónicos (por ejemplo, confirmación de registro, notificaciones, etc).

### 🗄️ Base de Datos

- **MongoDB Atlas** – Base de datos en la nube para almacenar toda la información del sistema (usuarios, publicaciones, comentarios, etc).

### 🧪 Herramientas de Desarrollo

- **Nodemon 3.1.10** – Recarga automática del servidor durante el desarrollo.

### 🛡️ Middlewares Personalizados

- **Autenticación** – Verifica que los endpoints protegidos sólo sean accesibles con un token JWT válido. También tenemos la corroboración de identidad ante cambiar foto de perfil, editar (y eliminar) posts y comentarios.
- **Multer** – Configurado para gestionar la subida de imágenes u otros archivos asociados a publicaciones o perfiles de mascotas (directorio: `/uploads`).

### 🌱 Variables de Entorno

- [**dotenv**] –Se usará para gestionar **variables sensibles** como claves secretas, URLs de conexión, etc.

## 🔌 Funcionalidades del Backend

El backend de **Patitas Conectadas** está estructurado siguiendo el patrón MVC (Modelo–Vista–Controlador) y se compone de tres controladores principales: `User`, `Post` y `Comment`. Cada uno maneja operaciones clave sobre sus respectivas entidades. A continuación, se detallan las funcionalidades disponibles a través de los distintos endpoints de la API:

---

### 👤 User Controller

Manejo de usuarios del sistema (mascotas). Incluye registro, autenticación y perfil.

#### Endpoints:

- `POST /users/` – Registro de un nuevo usuario (con imagen opcional y confirmación vía email).
- `POST /users/login` – Inicio de sesión y generación de token JWT.
- `PUT /users/id/:_id` – Actualización de datos del usuario autenticado.
- `GET /users/id/:_id` – Obtener usuario por ID.
- `GET /users/name/:name` – Buscar usuario por nombre.
- `GET /users/profile` – Obtener el usuario autenticado a partir del token.
- `GET /users/confirm/:email` – Confirmación de cuenta vía correo electrónico.
- `DELETE /users/logout` – Cierre de sesión.

---

### 🐾 Post Controller

Gestión de publicaciones de mascotas.

#### Endpoints:

- `POST /posts/` – Crear un post (con imagen opcional).
- `POST /posts/id/:_id` – Dar "like" a un post.
- `PUT /posts/id/:_id` – Editar un post (requiere autenticación y ser autor).
- `DELETE /posts/id/:_id` – Eliminar un post (requiere autenticación y ser autor).
- `GET /posts/` – Obtener todos los posts.
- `GET /posts/id/:_id` – Obtener un post por ID.
- `GET /posts/title/:title` – Buscar posts por título.

---

### 💬 Comment Controller

Manejo de comentarios en publicaciones.

#### Endpoints:

- `POST /comments/` – Crear un comentario (con imagen opcional).
- `POST /comments/id/:_id` – Dar "like" a un comentario.
- `PUT /comments/id/:_id` – Editar un comentario (requiere autenticación y ser autor).
- `DELETE /comments/id/:_id` – Eliminar un comentario (requiere autenticación y ser autor).
- `GET /comments/` – Obtener todos los comentarios.

---

## 📬 Documentación Detallada de la API

Para explorar y probar todos los endpoints disponibles de forma interactiva, puedes acceder a la documentación completa de la API en Postman:

🔗 **[Documentación en Postman](https://documenter.getpostman.com/view/45292031/2sB2x6kWx3)**

### ¿Qué encontrarás en la colección?

- ✅ Descripción detallada de todos los endpoints (`users`, `posts`, `comments`) con sus métodos, parámetros y respuestas esperadas.
- 📥 Estructura de datos de entrada (`body` JSON), headers y uso de tokens JWT.
- 📡 Códigos de respuesta HTTP: éxito, errores de validación, autenticación fallida, etc.
- 🧪 Posibilidad de ejecutar las peticiones directamente desde la interfaz de Postman.

> 💡 _Puedes importar la colección a tu propio espacio de Postman para usarla durante el desarrollo o pruebas._

---

### 🧱 Modelos de Datos (MongoDB + Mongoose)

### 👤 Modelo: User

Representa una mascota dentro de la red social. Incluye su información de autenticación, perfil, estado de verificación y tokens activos.

```js
{
  name: String,              // Nombre de la mascota
  password: String,          // Contraseña (hasheada con bcryptjs)
  email: String,             // Correo electrónico (único)
  role: String,              // Rol del usuario (por defecto: "user")
  confirmed: Boolean,        // Indica si el usuario confirmó su cuenta vía email
  image: [String],           // Array de URLs de imágenes de perfil
  tokens: [                  // Tokens JWT activos
    {
      token: String
    }
  ]
}
```

-🎇**Validaciones**

- `name`: requerido
- `password`: requerido
- `email`: requerido y debe ser único
- `password`: se almacena hasheado utilizando `bcryptjs`
- Se crea un índice de texto sobre el campo `name` para permitir búsquedas con filtros de texto

---

- 🔗 **Relaciones:**
- `tokens`: cada usuario puede tener múltiples tokens activos, lo cual permite mantener sesiones en distintos dispositivos o navegadores

### 📝 Modelo: Post

Representa una publicación realizada por una mascota dentro de la red social.

```js
{
  title: String,            // Título del post
  body: String,             // Contenido del post
  user: ObjectId,           // Referencia al usuario (mascota) que lo creó
  comments: [ObjectId],     // Referencias a los comentarios asociados
  likes: [ObjectId],        // Referencias a usuarios que dieron "like"
  image: [String]           // Array de URLs de imágenes asociadas
}
```

- 🔗 **Relaciones:**

  - `user`: referencia al modelo `User`
  - `comments`: referencias al modelo `Comment`
  - `likes`: referencias al modelo `User`

  ***

- 🕒 **Timestamps automáticos**
  Este modelo incluye las marcas de tiempo generadas automáticamente por Mongoose:
- `createdAt`
- `updatedAt`

### 💬 Modelo: Comment

Representa un comentario realizado por una mascota en una publicación.

```js
{
  text: String,              // Contenido del comentario
  postId: ObjectId,          // Referencia al post asociado
  user: ObjectId,            // Referencia al usuario (mascota) que comenta
  likes: [ObjectId],         // Referencias a usuarios que dieron "like" al comentario
  image: [String]            // Array de URLs de imágenes opcionales adjuntas al comentario
}
```

-🎇**Validaciones**

- `text`: campo de texto para el contenido del comentario (puede estar acompañado de imágenes)
- `postId`: obligatorio, referencia válida a un `Post`
- `user`: obligatorio, referencia válida a un `User`
- `likes`: array de referencias a `User`, por defecto vacío
- `image`: opcional, permite múltiples imágenes por comentario

---

- 🔗 **Relaciones:**
- `postId`: referencia al modelo `Post`
- `user`: referencia al modelo `User`
- `likes`: referencias al modelo `User`

---

- 🕒 **Timestamps automáticos**
  Este modelo incluye las marcas de tiempo generadas automáticamente por Mongoose:
- `createdAt`
- `updatedAt`

---

## 📂 Estructura del Proyecto

A continuación, se muestra la organización de carpetas y archivos principales del backend de **Patitas Conectadas**:

```plaintext
Patitas-Conectadas/
│
├── config/
│   ├── config.js            # Configuración general (e.g., conexión a base de datos)
│   └── nodemailer.js        # Configuración para envío de emails
│
├── controllers/
│   ├── CommentController.js # Lógica de negocio para comentarios
│   ├── postController.js    # Lógica de negocio para posts
│   └── userController.js    # Lógica de negocio para usuarios
│
├── middlewares/
│   ├── authentication.js    # Middleware para autenticación y autorización
│   └── uploads.js           # Middleware para manejo de cargas de archivos (Multer)
│
├── models/
│   ├── Comment.js           # Modelo de datos para comentarios
│   ├── post.js              # Modelo de datos para posts
│   └── user.js              # Modelo de datos para usuarios
│
├── routes/
│   ├── comment.js           # Rutas para la entidad comentario
│   ├── post.js              # Rutas para la entidad post
│   └── user.js              # Rutas para la entidad usuario
│
├── .gitignore               # Archivos y carpetas ignoradas por Git (e.g., node_modules, .env)
├── index.js                 # Archivo principal que inicializa el servidor y define rutas
├── package.json             # Dependencias y scripts del proyecto
└── package-lock.json        # Archivo de bloqueo de versiones de dependencias
```

---

## 🚀 Cómo Ejecutar el Proyecto

Sigue estos pasos para poner en marcha el backend de **Patitas Conectadas** en tu entorno local.

### 1. Clonar el repositorio

```bash
git clone https://github.com/palomaceg/PatitasConectadas
cd Patitas-Conectadas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y define las variables necesarias para la conexión a la base de datos, JWT, y configuración de Nodemailer.

Ejemplo básico:

```js
MONGO_URI = tu_uri_de_mongo_atlas;
JWT_SECRET = tu_clave_secreta;
EMAIL_USER = tu_correo_electronico;
EMAIL_PASS = tu_contraseña_de_correo;
```

⚠️ Recuerda no subir el archivo .env a tu repositorio (por eso está en .gitignore).

### 4. Ejecutar el servidor en entorno local

Con nodemon para que el servidor se reinicie automáticamente ante cambios:

```bash
npm run dev
```

⚠️(Asegúrate de tener nodemon instalado, está listado en las dependencias del proyecto.)

Por defecto, el servidor estará corriendo en:
🌐 http://localhost:8080 (o el puerto que definas en tu archivo .env)

### 5. Entorno en Producción

El backend también está desplegado en Render, accesible en:  
🔗 https://patitasconectadas.onrender.com

### Scripts disponibles en package.json

-`npm start` — Inicia el servidor normalmente.

-`npm run dev` — Inicia el servidor con `nodemon` para desarrollo.

## 🐶 ¡Gracias por llegar hasta aquí!

Agradecemos muchísimo tu tiempo y tu interés en **Patitas Conectadas**, un proyecto hecho con amor por y para nuestras queridas mascotas. 🐾💙

Este backend fue creado con la intención de darles a los peludos un espacio donde puedan compartir aventuras, hacer nuevos amigos y repartir muchos likes perrunos y gatunos. 🐕🐈✨

¡Esperamos que disfrutes explorando el código tanto como nosotros disfrutamos desarrollándolo!

Con cariño,  
el equipo de **Patitas Conectadas** 🐾🐾
