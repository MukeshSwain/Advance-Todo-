import jwt from "jsonwebtoken";
export const generateToken =async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        return token
    } catch (error) {
        console.log("Error in generating token ", error.message);
        
    }
}