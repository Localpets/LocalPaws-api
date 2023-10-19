import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).json({
                ok: false,
                msg: 'No token provided'
            })
        }
        
        const decoded = jwt.verify(token, process.env.SECRET);

        const userId = await User.getUserById(decoded.id, {password: 0});

        if (!userId) {
            return res.status(404).json({
                ok: false,
                msg: 'No user found with that id for the token provided'
            })
        }

        if (userId.type === 'USER' || userId.type === 'ADMIN') {
            console.log('El usuario ', userId.username, ' con ID ',userId.user_id ,' es un usuario normal y pudo realizar esta accion.')
            next();
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized'
        });
    }
}

export default verifyToken;