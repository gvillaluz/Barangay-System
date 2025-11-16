import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const reqHeader = req.headers.authorization;

    if (!reqHeader) return res.status(401).json({
        success: false,
        message: "No token provided."
    });

    const token = reqHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Invalid token."
        });
    }
}