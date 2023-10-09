// importar el modelo del mensaje
import Message from "../models/message.model.js";
import multer from "multer";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { userRooms } from '../models/SharedSockets.js';
import fs from "fs";


// Configura Multer para subir archivos
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.body.sender_id; // Obtén el ID del usuario desde la solicitud (ajusta esto según tu estructura de datos)
      const userFolderPath = join(__dirname, `../uploads/assets/chatsImage/user_${userId}/`);
  
      // Crea la carpeta del usuario si no existe
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true });
      }
  
      cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, fileName);
    }
  });
  

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido'));
    }
  }
}).single('image');
export async function messageCreate(req, res) {
    let image_url = '';
    // Utiliza el middleware de multer para subir la imagen
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({
          ok: false,
          msg: err.message
        });
      }
  
      try {
        const {  text, room, replies } = req.body;
        const sender_id = parseInt(req.body.sender_id);
        const receiver_id = parseInt(req.body.receiver_id);
        let replyMessage = {};
        // Verifica si se cargó una imagen
        if (req.file) {
          // Sube la imagen a Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `ChatsImages/user:${sender_id}`,
            resource_type: 'image',
            overwrite: true,
          });
          image_url = result.secure_url;
        }

       // Crear el mensaje en la base de datos
        const message = await Message.createMessage(
            sender_id,
            receiver_id,
            text,
            image_url,
            room,
            replyMessage ? replyMessage.id : 1 // Utiliza el ID de replyMessage si existe
        );

        if (replies) {
            const repliesJson = JSON.parse(replies);
           // Accede a las propiedades directamente
            const id = repliesJson.id;
            const sender_id = repliesJson.sender_id;
            const text = repliesJson.text;
            const image_url = repliesJson.image_url;
            // Accede a las propiedades del objeto replies
            const IntRepliesId = parseInt(id);

            // Crea una fila en la tabla MessageReply
            replyMessage = await Message.createMessageReply({
                text: text,
                image_url: image_url,
                senderId: sender_id,
                parentMessageId: IntRepliesId,
                replyMessageId: message.id
            });
            
        }
  
        // Obtén la lista de salas del receptor y el remitente desde el objeto userRooms
        const senderRooms = userRooms[sender_id] || [];
        const receiverRooms = userRooms[receiver_id] || [];
  
        // Verifica si ambos usuarios están en la misma sala
        const areInSameRoom = senderRooms.some(roomName => receiverRooms.includes(roomName));
  
        // Define el valor de is_read para el receptor
        const receiverIsRead = areInSameRoom ? 1 : 0;
  
        // Crear el registro de estado del mensaje para el remitente (sender_id)
        const senderMessageStatus = await Message.createMessageStatus({
          user_id: sender_id,
          message_id: message.id,
          is_deleted: 0,
          is_read: 1,
        });
  
        // Crear el registro de estado del mensaje para el receptor (receiver_id)
        const receiverMessageStatus = await Message.createMessageStatus({
          user_id: receiver_id,
          message_id: message.id,
          is_deleted: 0,
          is_read: receiverIsRead,
        });
  
        res.status(200).json({
            msg: 'Mensaje creado correctamente',
            ok: true,
            message,
            senderMessageStatus,
            receiverMessageStatus,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            ok: false,
            msg: 'Error al crear el mensaje',
          });
        }
      });
    }

    export async function GetResponsesByMessageId(req, res) {
        try {
          const messageId = parseInt(req.params.message_id);
          const responses = await Message.getResponsesByMessageId(messageId);
          if (responses === null) {
            return res.status(404).json({
              ok: false,
              msg: 'Mensaje no encontrado',
            });
          }
      
          res.status(200).json({
            ok: true,
            responses,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            ok: false,
            msg: 'Error al obtener respuestas',
          });
        }
      }
      
export async function messageGetById(req, res) {
    try {
        const id = parseInt(req.params.message_id);
        const message = await Message.getMessageById(id);
        res.status(200).json({
            msg: "Mensaje obtenido correctamente",
            ok: true,
            message
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener el mensaje"
        });
    }
}

export async function messageGetAll(req, res) {
    try {
        const userId = parseInt(req.params.user_id);
        const messages = await Message.getAllMessagesByUserId(userId);
        res.status(200).json({
            msg: "Mensajes obtenidos correctamente",
            ok: true,
            messages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener los mensajes"
        });
    }
}  

export async function messageStatusCreate(req, res) {
    const {
        user_id,
        message_id,
        is_deleted,
        is_read
    } = req.body;

    try {
    const messageStatus = await Message.createMessageStatus(
        user_id,
        message_id,
        is_deleted,
        is_read
    );

    res.status(200).json({
        msg: 'Estado del mensaje creado correctamente',
        ok: true,
        messageStatus,
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
        ok: false,
        msg: 'Error al crear el estado del mensaje',
    });
    }
}

export async function GetUnreadMessagesByUserId(req, res) {
    try {
      const userId = parseInt(req.params.user_id);
      const unreadMessages = await Message.getUnreadMessagesStatus(userId);
  
      res.status(200).json({
        msg: "Mensajes no leídos obtenidos correctamente",
        ok: true,
        unreadMessages
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los mensajes no leídos"
      });
    }
  }

export async function messageUpdate(req, res) {
    const { message_id } = req.params;
    const { text, edited } = req.body;
    try {
        const updatedMessage = await Message.updateMessage(parseInt(message_id), text, edited);
        res.status(200).json({
            msg: "Mensaje actualizado correctamente",
            ok: true,
            message: updatedMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el mensaje"
        });
    }
}


export async function messageDelete(req, res) {
    const { message_id } = req.params;
  
    try {
      // Obtener información del mensaje antes de eliminarlo
      const message = await Message.getMessageById(parseInt(message_id));
      if (!message) {
        return res.status(404).json({
          ok: false,
          msg: 'Mensaje no encontrado',
        });
      }
  
      // Verificar si hay una URL de imagen asociada al mensaje
      if (message.image_url) {
        // Obtener el identificador único de Cloudinary desde la URL
        const cloudinaryPublicId = message.image_url.split('/').pop().split('.')[0];
        // Eliminar el archivo de Cloudinary
        await cloudinary.api.delete_resources([`ChatsImages/user:${message.sender_id}/${cloudinaryPublicId}`]);
      }
  
      // Eliminar el mensaje en sí
      await Message.deleteMessage(parseInt(message_id));
  
      res.status(200).json({
        msg: "Mensaje y archivo asociado en Cloudinary eliminados correctamente",
        ok: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el mensaje y el archivo asociado en Cloudinary",
      });
    }
  }
  
  

export async function messageStatusDelete(req, res) {
    const { message_id } = req.params;
    try {
        await Message.deleteMessageStatus(parseInt(message_id));

        res.status(200).json({
            msg: "'Estado del mensaje eliminado correctamente",
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar estado del mensaje"
        });
    }
}

export async function messageAddReaction(req, res) {
    const { message_id } = req.params;
    const { user_id, Reaction } = req.body;
    try {
        const updatedMessage = await Message.addReaction(
            parseInt(message_id),
            parseInt(user_id),
            Reaction 
        );
        res.status(200).json({
            msg: "Like agregado correctamente",
            ok: true,
            message: updatedMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al agregar el like al mensaje"
        });
    }
}

export async function messageRemoveReaction(req, res) {
    const { reaction_id } = req.params; 
    try {
        await Message.removeReaction(parseInt(reaction_id));

        res.status(200).json({
            msg: "Reacción eliminada correctamente",
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar la reacción del mensaje"
        });
    }
}


export async function getMessagesReaction(req, res) {
    const { message_id } = req.params;
    try {
        const reactions = await Message.GetMessagesReaction(parseInt(message_id));
        res.status(200).json({
            ok: true,
            reactions: reactions
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener las reacciones del mensaje"
        });
    }
}

export async function getAllMessagesReaction(req, res) {
    try {
        const reactions = await Message.GetMessagesReaction();
        res.status(200).json({
            ok: true,
            reactions: reactions
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener las reacciones del mensaje"
        });
    }
}

export async function GetAllMessagesStatus(req, res) {
    try {
        const Status = await Message.GetAllMessagesStatus();
        res.status(200).json({
            ok: true,
            Status: Status
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener los estados del mensaje"
        });
    }
}

export async function getMessageStatus(req, res) {
    const { user_id, message_id } = req.params;
    try {
        const messageStatus = await Message.getMessageStatus(parseInt(user_id), parseInt(message_id));
        res.status(200).json({
            ok: true,
            messageStatus: messageStatus || null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener el estado del mensaje"
        });
    }
}
export async function markMessageAsRead(req, res) {
    const { user_id, message_id } = req.params;
    try {
        const messageStatus = await Message.getMessageStatus(parseInt(user_id), parseInt(message_id));
        if (messageStatus) {
            await Message.MarkAsReadMessageStatus(messageStatus.id, 1); 
            res.status(200).json({
                ok: true,
                msg: "Mensaje marcado como leído"
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "Mensaje no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al marcar el mensaje como leído"
        });
    }
}

export async function markMessageAsDeleted(req, res) {
    const { user_id, message_id } = req.params;
    try {
        const messageStatus = await Message.getMessageStatus(parseInt(user_id), parseInt(message_id));
        if (messageStatus) {
            await Message.MarkAsDeletedMessageStatus(messageStatus.id, 1); 
            res.status(200).json({
                ok: true,
                msg: "Mensaje marcado como eliminado"
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "Mensaje no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al marcar el mensaje como eliminado"
        });
    }
}