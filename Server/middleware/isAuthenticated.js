import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        
        
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ error: "Unauthorized",success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in isAuthenticated ", error.message);
        return res.status(401).json({ error: "Unauthorized",success: false });
    }
}