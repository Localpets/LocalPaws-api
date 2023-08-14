// Paquetes de Node.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

// Rutas de la API
import authRouter from '../routes/auth.routes.js';
import userRouter from '../routes/user.routes.js';
import commentRouter from '../routes/comment.routes.js';
import locationRouter from '../routes/location.routes.js';
import postRouter from '../routes/post.routes.js';
import likeRouter from '../routes/like.routes.js';
import followRouter from '../routes/follow.routes.js';

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
        this.whiteList = ['http://localhost:5173', 'https://localpaws-api-vdfi-dev.fl0.io/', '15.197.201.241:443'];

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
    }

    routes() {
        this.app.use(this.authRoutePath, authRouter);
        this.app.use(this.userRoutePath, userRouter);
        this.app.use(this.commentRoutePath, commentRouter);
        this.app.use(this.locationRoutePath, locationRouter);
        this.app.use(this.postRoutePath, postRouter);
        this.app.use(this.likeRoutePath, likeRouter);
        this.app.use(this.followRoutePath, followRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Pawsplorer app listening on port ${this.port}`);
        });
    }

}

export default Server;