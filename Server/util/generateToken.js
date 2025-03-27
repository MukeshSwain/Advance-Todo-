import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    try {
        // Generate JWT Token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set Token in HTTP-Only Secure Cookie
        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access (secure against XSS)
            secure: process.env.NODE_ENV === "production",  // Use HTTPS in production
            sameSite: "None",  // Required for cross-origin cookies
            maxAge: 24 * 60 * 60 * 1000  // 1 day expiry
        });

        return token;  // Return token for further use (if needed)
    } catch (error) {
        console.error("Error in generating token:", error.message);
        return null;  // Return null if token generation fails
    }
};
