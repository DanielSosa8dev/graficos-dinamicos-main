// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key_here';

module.exports = (req, res, next) => {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Añadir usuario al request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'El token no es válido' });
    }
};