// importar el router de express para manejar las peticiones HTTP
import { Router } from "express";

// Importar los métodos de notificación
import {
    createNotification,
    getNotificationById,
    getNotificationsByUserId,
    updateNotificationById,
    deleteNotificationById,
    deleteNotificationsByUserId
} from "../controllers/notification.controller.js";

// Importar el middleware de autenticación
import verifyToken from "../middlewares/authJWT";

// Iniciar el router

const notificationRouter = Router();

// Crear las rutas
notificationRouter.post("/create", verifyToken, createNotification);
notificationRouter.get("/find/id/user/:user_id", verifyToken, getNotificationsByUserId);
notificationRouter.get("/find/id/:id", verifyToken, getNotificationById);
notificationRouter.put("/edit/id/:id", verifyToken, updateNotificationById);
notificationRouter.delete("/delete/id/:id", verifyToken, deleteNotificationById);
notificationRouter.delete("/delete/user/id/:user_id", verifyToken, deleteNotificationsByUserId);

// Exportar el router
export default notificationRouter;