import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import http from 'http';
import { Server as ServerIO } from 'socket.io';

// Importa las rutas de la API
import authRouter from '../routes/auth.routes.js';
import userRouter from '../routes/user.routes.js';
import commentRouter from '../routes/comment.routes.js';
import locationRouter from '../routes/location.routes.js';
import postRouter from '../routes/post.routes.js';
import likeRouter from '../routes/like.routes.js';
import followRouter from '../routes/follow.routes.js';
import notificationRouter from '../routes/notification.routes.js';
import chatRouter from '../routes/message.routes.js';
import { userRooms } from './SharedSockets.js';

// Acceso a variables de entorno
dotenv.config();

class Server {
    constructor() {
        // Inicialización del servidor
        this.app = express();
        this.port = process.env.PORT;

        // Routes
        this.authRoutePath = '/api/auth';
        this.userRoutePath = '/api/user';
        this.commentRoutePath = '/api/comment';
        this.locationRoutePath = '/api/location';
        this.postRoutePath = '/api/post';
        this.likeRoutePath = '/api/like';
        this.followRoutePath = '/api/follow';
        this.notificationRoutePath = '/api/notification';
        this.chatRouter = '/api/message';
        // Crear el servidor HTTP
        this.httpServer = http.createServer(this.app);

        // Configurar la lista blanca de dominios permitidos para CORS
        this.whiteList = ['http://localhost:5173', 'https://localpaws-api-vdfi-dev.fl0.io/', '15.197.201.241:443', 'http://localhost:3000'];

        // Crear una instancia de Socket.IO pasándole el servidor HTTP
        this.io = new ServerIO(this.httpServer, {
            cors: {
                origin: this.whiteList,
                credentials: true
            }
        });

        // Configurar los manejadores de eventos de Socket.IO
        this.configureSocketEvents();

        // Aplicar middlewares
        this.middlewares();

        // Definir las rutas
        this.routes();
    }

    // Configurar eventos de socket en el servidor
    configureSocketEvents = () => {
        this.io.on('connection', (socket) => {
          // Maneja la lógica para identificar al cliente, por ejemplo, usando su ID de usuario
          const userId = socket.handshake.query.userId;

          // Verifica si ya existe una conexión para este usuario
          if (!this.activeConnections) {
            this.activeConnections = {}; // Inicializa el objeto si no existe
          }
      
          if (this.activeConnections[userId]) {
            // Cerrar la nueva conexión
            socket.disconnect();
            socket.emit('leavePersonalRoom)', userId)
          } else {
            // Almacena la conexión activa para este usuario
            this.activeConnections[userId] = socket;
      
            // Agregar un campo "userId" al objeto socket para futuras referencias
            socket.userId = userId;

                //socket para unir a un usuario a sala unica
                socket.on('PersonalRoom', (UserRoom) => {
                    socket.join(UserRoom)
                    console.log(`Usuario ${userId} se unió a su sala privada: ${UserRoom}`);
                })

                //socket para salir de la sala unica
                socket.on('leavePersonalRoom', (UserRoom) => {
                    socket.leave(UserRoom)
                    console.log(`Usuario ${userId} salio de su sala privada: ${UserRoom}`);
                });

                //socket para unir a una sala de chat
                socket.on('joinRoom', (roomName) => {
                    socket.join(roomName);
                    console.log(`Usuario ${userId} se unió a la sala: ${roomName}`);

                    // Registra la sala en el objeto userRooms
                    if (!userRooms[userId]) {
                        userRooms[userId] = [];
                    }
                    userRooms[userId].push(roomName);
                });
                
                //socket para salir de la sala de chat
                socket.on('leaveRoom', (currentRoomName) => {
                    socket.leave(currentRoomName)
                    console.log(`Usuario ${userId} salio de la sala: ${currentRoomName}`);

                    // Elimina la sala del registro del usuario
                    if (userRooms[userId]) {
                        userRooms[userId] = userRooms[userId].filter(room => room !== currentRoomName);
                    }
                })

                //socket para salir de todas las salas excepto la PersonalRoom
                socket.on('leaveAllRooms', () => {
                    if (userRooms[userId]) {
                        userRooms[userId].forEach(room => {
                            // Verifica si la sala no es la PersonalRoom
                            if (room !== 'PersonalRoom') {
                                socket.leave(room);
                                console.log(`Usuario ${userId} salio de la sala: ${room}`);
                            }
                        });
                        // Deja solo la PersonalRoom en el registro del usuario
                        userRooms[userId] = ['PersonalRoom'];
                    }
                });

                // Enviar un mensaje a la sala de chat
                socket.on('sendMessage', (message) => {
                    this.io.to(message.room).emit('newMessage', message);

                    // Actualizar el botón de chat en la sala
                    this.io.to(message.room).emit('MessageBtnUpdate', message)

                    // Actualizar el botón de chat en la sala
                    this.io.to(message.receiver_id).emit('MessageBtnUpdate', message)
                });
  
    
                // Editar un mensaje en la sala de chat
                socket.on('editMessage', (message) => {
                    this.io.to(message.room).emit('editedMessage', message);

                    // Actualizar el botón de chat en la sala
                    this.io.to(message.room).emit('EditedBtnUpdate', message);

                    // Actualizar el botón de chat del usuario
                    this.io.to(message.receiver_id).emit('EditedBtnUpdate', message);
                });
            
                // Eliminar un mensaje en la sala de chat
                socket.on('deleteMessage', (message) => {
                    this.io.to(message.room).emit('deletedMessage', message.id);

                    // Actualizar el botón de chat en la sala
                    this.io.to(message.room).emit('DeletedMsgBtnUpdate', message);
                    
                    // Actualizar el botón de chat del usuario
                    this.io.to(message.receiver_id).emit('DeletedMsgBtnUpdate', message);
                });
                
            
                // Agregar una reacción a un mensaje en la sala de chat
                socket.on('addReaction', (reaction) => {
                    this.io.to(reaction.room).emit('addedReaction', reaction);
                });
                
            
                // Eliminar una reacción de un mensaje en la sala de chat
                socket.on('removeReaction', (reaction) => {
                    this.io.to(reaction.room).emit('removedReaction', reaction);
                });
                
                //socket para actualizar la lista de contactos
                socket.on('updateContacs', (User) => {
                    this.io.to(User).emit('updateContacs');
                })

                // socket para actualizar los chats eliminados
                socket.on('DeletedChats', (Data) => {
                    this.io.to(Data.userId).emit('DeletedChatBtnUpdate', Data.messageIds);
                })

                //socket para desconectar al usuario del cliente
                socket.on('disconnect', () => {
                    console.log(`Cliente con ID ${userId} desconectado.`);
                    delete this.activeConnections[userId];
                });
            }
        });
        }



    middlewares() {
        // Middleware de CORS
        this.app.use(cors({ origin: this.whiteList, credentials: true }));

        // Parsear JSON en el cuerpo de las peticiones
        this.app.use(express.json());

        // Servir archivos estáticos desde el directorio 'public'
        this.app.use(express.static('public'));

        // Middleware para manejar cookies
        this.app.use(cookieParser());

        // Cloudinary
        cloudinary.config({ 
            cloud_name: 'djm7rshns', 
            api_key: '416334371141741', 
            api_secret: process.env.CLOUDINARY_SECRET_KEY 
        });
    }

    routes() {
        this.app.use(this.authRoutePath, authRouter);
        this.app.use(this.userRoutePath, userRouter);
        this.app.use(this.commentRoutePath, commentRouter);
        this.app.use(this.locationRoutePath, locationRouter);
        this.app.use(this.postRoutePath, postRouter);
        this.app.use(this.likeRoutePath, likeRouter);
        this.app.use(this.followRoutePath, followRouter);
        this.app.use(this.notificationRoutePath, notificationRouter);
        this.app.use(this.chatRouter, chatRouter);

        // Agregar las rutas de Socket.IO
        this.app.use('/socket.io', (req, res) => {
            // Esta ruta se utiliza para manejar la comunicación de Socket.IO
        });
    }

    listen() {
        // Iniciar la escucha del servidor HTTP en el puerto especificado
        this.httpServer.listen(this.port, () => {
            console.log(`La aplicación Pawsplorer está escuchando en el puerto ${this.port}`);
        }, (error) => { 
            if (error) {
                console.log(error);
            }
        });
    }
}

export default Server;
