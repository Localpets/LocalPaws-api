// Importar response de express para tipar el response de los métodos
import { response } from "express";
// Importar el modelo de notificación
import Notification from "../models/notification.model.js";

export const createNotification = async (req, res = response) => {
    const {user_id, user_received_id, text, type} = req.body;

    try {
        const notification = await Notification.createNotification(user_id, user_received_id, text, type);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({
            message: "Error creating notification",
            error
        });
    }
}

export const getNotificationById = async (req, res = response) => {
    try {
        const notificationId = parseInt(req.params.id);
        const notification = await Notification.getNotificationById(notificationId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}

export const getNotificationsByUserSenderId = async (req, res = response) => {
    try {
        const userId = parseInt(req.params.user_id);
        const notification = await Notification.getNotificationsByUserSenderId(userId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}

export const getNotificationsByUserId = async (req, res = response) => {
    try {
        const userId = parseInt(req.params.user_id);
        const notification = await Notification.getNotificationsByUserId(userId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}

export const updateNotificationById = async (req, res = response) => {
    try {
        const notificationId = parseInt(req.params.id);
        const notification = await Notification.updateNotificationById(notificationId, req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}

export const deleteNotificationById = async (req, res = response) => {
    try {
        const notificationId = parseInt(req.params.id);
        const notification = await Notification.deleteNotificationById(notificationId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}

export const deleteNotificationsByUserId = async (req, res = response) => {
    try {
        const userId = parseInt(req.params.user_id);
        const notification = await Notification.deleteNotificationsByUserId(userId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({
            message: "Notification not found",
            error
        });
    }
}
