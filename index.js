import dotenv from 'dotenv';
import Server from './src/models/server.model.js';
dotenv.config();

const server = new Server();
server.routes();
server.listen();
