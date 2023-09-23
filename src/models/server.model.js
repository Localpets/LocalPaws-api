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
          } else {
            // Almacena la conexión activa para este usuario
            this.activeConnections[userId] = socket;
            console.log(`Usuario ${userId} conectado al socket`)
      
            // Agregar un campo "userId" al objeto socket para futuras referencias
            socket.userId = userId;
                
                socket.on('joinRoom', (roomName) => {
                    socket.join(roomName);
                    console.log(`Usuario ${userId} se unió a la sala: ${roomName}`);
                });
                
                socket.on('leaveRoom', (currentRoomName) => {
                    socket.leave(currentRoomName)
                    console.log(`Usuario ${userId} salio de la sala: ${currentRoomName}`);
                })
            
                // Enviar un mensaje a la sala
                socket.on('sendMessage', (message) => {
                    this.io.to(message.room).emit('newMessage', message);
                });
  
    
                // Editar un mensaje en la sala
                socket.on('editMessage', (message) => {
                    this.io.to(message.room).emit('editedMessage', message);
                });
            
                // Eliminar un mensaje en la sala
                socket.on('deleteMessage', (message) => {
                    this.io.to(message.room).emit('deletedMessage', message.id);
                });
            
                // Agregar una reacción a un mensaje en la sala
                socket.on('addReaction', ( reaction ) => {
                    this.io.to(reaction.room).emit('addedReaction', reaction);
                });
            
                // Eliminar una reacción de un mensaje en la sala
                socket.on('removeReaction', ( reaction ) => {
                    this.io.to(reaction.room).emit('removedReaction', reaction);
                });
            
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
        });
    }
}

export default Server;
