// Paquetes de Node.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';

// Rutas de la API
import authRouter from '../routes/auth.routes.js';
import userRouter from '../routes/user.routes.js';
import commentRouter from '../routes/comment.routes.js';
import locationRouter from '../routes/location.routes.js';
import postRouter from '../routes/post.routes.js';
import likeRouter from '../routes/like.routes.js';
import followRouter from '../routes/follow.routes.js';
import notificationRouter from '../routes/notification.routes.js';

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
        this.whiteList = ['http://localhost:5173', 'https://localpaws-api-vdfi-dev.fl0.io/', '15.197.201.241:443', 'http://localhost:3000'];

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() { 
        // CORS
        this.app.use(cors({ origin: this.whiteList, credentials: true }))
        
        // Body read and parse
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Cookies
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Pawsplorer app listening on port ${this.port}`);
        });
    }

}

export default Server;