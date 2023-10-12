# Documentación de Rutas

A continuación se detallan las rutas disponibles en esta API para diversas funcionalidades, incluyendo la gestión de usuarios, posts, comentarios, likes, seguidores, ubicaciones y más.
## Ten en cuenta que: 
- **La ruta base de la api es /api/:controlador**
- Estos son los controladores que tenemos de momento:
- this.authRoutePath = '/api/auth';
- this.userRoutePath = '/api/user';
- this.commentRoutePath = '/api/comment';
- this.locationRoutePath = '/api/location';
- this.postRoutePath = '/api/post';
- this.likeRoutePath = '/api/like';
- this.followRoutePath = '/api/follow';
- this.chatRouter = '/api/message';
- this.notificationRoutePath = '/api/notification';



## Rutas de Autenticación

### Iniciar Sesión

Inicia sesión en la aplicación.

- **Ruta:** POST /login

### Registrar Usuario

Registra un nuevo usuario en la aplicación.

- **Ruta:** POST /register

### Cerrar Sesión

Cierra la sesión del usuario autenticado.

- **Ruta:** POST /logout

## Rutas de Comentarios

### Obtener Comentario por ID

Obtiene la información de un comentario por su ID.

- **Ruta:** GET /comment/find/:comment_id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Comentarios de un Post

Obtiene todos los comentarios de un post específico.

- **Ruta:** GET /comment/find/post/:comment_post_id
- **Middleware de Autenticación:** verifyToken

### Crear Comentario

Crea un nuevo comentario en un post.

- **Ruta:** POST /comment/create
- **Middleware de Autenticación:** verifyToken

### Actualizar Comentario

Actualiza un comentario por su ID.

- **Ruta:** PUT /comment/update/:comment_id
- **Middleware de Autenticación:** verifyToken

### Eliminar Comentario

Elimina un comentario por su ID.

- **Ruta:** DELETE /comment/delete/:comment_id
- **Middleware de Autenticación:** verifyToken

## Rutas de Likes

### Crear Like

Crea un nuevo like en un post o comentario.

- **Ruta:** POST /like/:like_type/:user_id/:post_id
- **Middleware de Autenticación:** verifyToken

### Obtener Like por ID

Obtiene la información de un like por su ID.

- **Ruta:** GET /like/:like_id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Likes de un Usuario

Obtiene todos los likes realizados por un usuario.

- **Ruta:** GET /like/user/:user_id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Likes de un Post

Obtiene todos los likes recibidos por un post.

- **Ruta:** GET /like/post/:post_id
- **Middleware de Autenticación:** verifyToken

### Eliminar Like

Elimina un like por su ID.

- **Ruta:** DELETE /like/:like_id
- **Middleware de Autenticación:** verifyToken

## Rutas de Follows (Seguidores)

### Crear Seguidor

Crea un nuevo seguidor entre dos usuarios.

- **Ruta:** POST /follow/:followerId/:followedId
- **Middleware de Autenticación:** verifyToken

### Obtener Seguidor por ID

Obtiene la información de un seguidor por su ID.

- **Ruta:** GET /follow/:follow_id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Seguidores de un Usuario

Obtiene todos los seguidores de un usuario.

- **Ruta:** GET /follow/user/:followerId
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Usuarios Seguidos por un Usuario

Obtiene todos los usuarios seguidos por un usuario.

- **Ruta:** GET /follow/followed/:followedId
- **Middleware de Autenticación:** verifyToken

### Eliminar Seguidor

Elimina un seguidor por su ID.

- **Ruta:** DELETE /follow/:followerId/:followedId
- **Middleware de Autenticación:** verifyToken

## Rutas de Ubicaciones

### Crear Ubicación

Crea una nueva ubicación.

- **Ruta:** POST /location/create
- **Middleware de Autenticación:** verifyToken

### Actualizar Ubicación

Actualiza la información de una ubicación por su ID.

- **Ruta:** PUT /location/update/:id
- **Middleware de Autenticación:** verifyToken

### Obtener Todas las Ubicaciones

Obtiene la información de todas las ubicaciones.

- **Ruta:** GET /location/find/all
- **Middleware de Autenticación:** verifyToken

### Obtener Ubicación por ID

Obtiene la información de una ubicación por su ID.

- **Ruta:** GET /location/find/id/:id
- **Middleware de Autenticación:** verifyToken

### Eliminar Ubicación

Elimina una ubicación por su ID.

- **Ruta:** DELETE /location/delete/:id
- **Middleware de Autenticación:** verifyToken

## Rutas de Categorías de Posts

### Crear Categoría de Post

Crea una nueva categoría de post.

- **Ruta:** POST /post/category/create
- **Middleware de Autenticación:** verifyToken

### Obtener Todas las Categorías de Posts

Obtiene la información de todas las categorías de posts.

- **Ruta:** GET /post/category/find/all
- **Middleware de Autenticación:** verifyToken

### Obtener Categoría de Post por ID

Obtiene la información de una categoría de post por su ID.

- **Ruta:** GET /post/category/find/id/:id
- **Middleware de Autenticación:** verifyToken

### Eliminar Categoría de Post

Elimina una categoría de post por su ID.

- **Ruta:** DELETE /post/category/delete/:id
- **Middleware de Autenticación:** verifyToken

## Rutas de Posts

### Crear Post

Crea un nuevo post.

- **Ruta:** POST /post/create
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Posts

Obtiene la información de todos los posts.

- **Ruta:** GET /post/find/all
- **Middleware de Autenticación:** verifyToken

### Obtener Post por ID

Obtiene la información de un post por su ID.

- **Ruta:** GET /post/find/id/:id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Posts de un Usuario

Obtiene todos los posts creados por un usuario.

- **Ruta:** GET /post/user/:userId
- **Middleware de Autenticación:** verifyToken

### Actualizar Post

Actualiza la información de un post por su ID.

- **Ruta:** PUT /post/update/:id/:post_user_id
- **Middleware de Autenticación:** verifyToken

### Eliminar Post

Elimina un post por su ID.

- **Ruta:** DELETE /post/delete/:id/:post_user_id
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Posts de Usuarios Seguidos

Obtiene todos los posts de los usuarios seguidos por un usuario.

- **Ruta:** GET /post/find/follows/user/:userId
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Posts de una Categoría

Obtiene todos los posts de una categoría específica.

- **Ruta:** GET /post/find/category/:category
- **Middleware de Autenticación:** verifyToken

## Rutas de Usuarios

### Obtener Usuario por ID

Obtiene la información de un usuario por su ID.

- **Ruta:** GET /user/find/id/:user_id
- **Middleware de Autenticación:** verifyToken

### Obtener Usuario por Correo Electrónico

Obtiene la información de un usuario por su correo electrónico.

- **Ruta:** GET /user/find/mail/:email
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Usuarios

Obtiene la información de todos los usuarios.

- **Ruta:** GET /user/find/all
- **Middleware de Autenticación:** verifyToken

### Actualizar Usuario

Actualiza la información de un usuario por su ID.

- **Ruta:** PUT /user/update/:user_id
- **Middleware de Autenticación:** verifyToken

### Eliminar Usuario

Elimina un usuario por su ID.

- **Ruta:** DELETE /user/delete/:user_id
- **Middleware de Autenticación:** verifyToken

### Crear Tipo de Usuario

Crea un nuevo tipo de usuario.

- **Ruta:** POST /user/type/create
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Tipos de Usuario

Obtiene la información de todos los tipos de usuario.

- **Ruta:** GET /user/type/find/all
- **Middleware de Autenticación:** verifyToken

### Obtener Tipo de Usuario por ID

Obtiene la información de un tipo de usuario por su ID.

- **Ruta:** GET /user/type/find/id/:id
- **Middleware de Autenticación:** verifyToken

### Eliminar Tipo de Usuario

Elimina un tipo de usuario por su ID.

- **Ruta:** DELETE /user/type/delete/:id
- **Middleware de Autenticación:** verifyToken

### Crear Género de Usuario

Crea un nuevo género de usuario.

- **Ruta:** POST /user/genre/create
- **Middleware de Autenticación:** verifyToken

### Obtener Todos los Géneros de Usuario

Obtiene la información de todos los géneros de usuario.

- **Ruta:** GET /user/genre/find/all
- **Middleware de Autenticación:** verifyToken

### Obtener Género de Usuario por ID

Obtiene la información de un género de usuario por su ID.

- **Ruta:** GET /user/genre/find/id/:id
- **Middleware de Autenticación:** verifyToken

### Eliminar Género de Usuario

Elimina un género de usuario por su ID.

- **Ruta:** DELETE /user/genre/delete/:id
- **Middleware de Autenticación:** verifyToken

## Rutas de mensajes
// Rutas relacionadas con mensajes individuales
Obtener mensaje por id
- **Ruta:** GET /message/get/:message_id
Crear mensaje
- **Ruta:** POST /message/create

Actualizar mensaje por id
- **Ruta:** PUT /message/:message_id
Eliminar mensaje por id
- **Ruta:** DELETE /message/delete/:message_id

// Rutas relacionadas con reacciones a mensajes
Añadir reacción por id de mensaje
- **Ruta:** POST /message/add-reaction/:message_id
Obtener reacción por id de mensaje
- **Ruta:** GET /message/find/reaction/:message_id
Eliminar reacción por id de reaccion
- **Ruta:** DELETE /message/remove-reaction/:reaction_id
Obtener todas las reacciones
- **Ruta:** GET /message/find/reactions/all

// Rutas relacionadas con estados de mensajes 
Crear estado de mensaje
- **Ruta:** POST /message/create-status

Eliminar estado del mensaje por su id
- **Ruta:** DELETE /message/delete-status/:message_id

Obtener estado del mensaje por id de usuario y mensaje
- **Ruta:** GET /message/get-status/:user_id/:message_id

Obtener todos los estados de los mensajes
- **Ruta:** GET /message/get-status/all

Obtener los estados de lectura por id de usuario.
- **Ruta:** GET /message/get-unread-status/:user_id

// Rutas relacionadas con marcado de mensajes
Marcar como leído un mensaje por id de usuario e id de mensaje
- **Ruta:** PUT /message/mark-as-read/:user_id/:message_id
Marcar como eliminado un mensaje por id de usuario e id de mensaje
- **Ruta:** PUT /message/mark-as-deleted/:user_id/:message_id

// Rutas relacionadas con respuestas a mensajes
Obtener las respuestas de un mensaje por su id
- **Ruta:** GET /message/get-responses/:message_id

// Rutas relacionadas con listado de mensajes
Obtener todos los mensajes de un usuario por su id
- **Ruta:** GET /message/find/all/:user_id

// Rutas relacionadas con grupos
Crear un grupo
- **Ruta:** POST /message/group/créate
Obtener un grupo por su id de grupo
- **Ruta:** GET /message/group/get/:group_id
Obtener todos los grupos
- **Ruta:** GET /message/group/get-all'
Obtener todos los grupos de un usuario por su id
- **Ruta:** GET /message/group/get-all/:user_id

// Rutas relacionadas con participantes de grupo
Añadir participante al grupo
- **Ruta:** POST /message/group/add-participant
Obtener participantes de un grupo por su id
- **Ruta:** GET /message/group/get-participants/:group_id
// Rutas relacionadas con mensajes de grupo
Crear un mensaje en el grupo
- **Ruta:** POST /message/group/create-message
Obtener un mensaje del grupo por su id de mensaje
- **Ruta:** GET /message/group/get-message/:message_id
Obtener todos los mensajes de un grupo por su id de grupo
- **Ruta:** GET /message/group/get-messages/:group_id'

## Nota

Todas las rutas que requieran autenticación deben incluir el token de acceso proporcionado al iniciar sesión. El token debe ser enviado en el encabezado "x-access-token" de la solicitud HTTP. El middleware "verifyToken" se encargará de verificar la validez del token y asegurarse de que el usuario esté autenticado correctamente.

Este documento proporciona una descripción general de las rutas disponibles en la API y de los middlewares utilizados para la autenticación y autorización. Te recomendamos consultar la documentación de cada controlador y middleware específico para obtener más detalles sobre los parámetros aceptados, las respuestas esperadas y otros detalles técnicos.

Ten en cuenta que esta documentación está sujeta a cambios y actualizaciones, y es importante mantenerla actualizada a medida que la API evolucione.

DATABSE_ADMIN - PlanetScale: 
User: ja840u8wtdlu6bj7zlg2
Password: pscale_pw_rwclwQQmk3bcwaVHStL5bou0nisuHpxcK5BHPEiub5E
