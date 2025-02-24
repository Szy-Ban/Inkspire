const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(403).json({ error: "Access denied. No token provided." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(403).json({ error: "Access denied. No token provided." });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;