import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        
    }
})

export const sendMail = async(to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text
        }

         const info = await transporter.sendMail(mailOptions); // Remove callback
         console.log("Email sent:", info.response);
    } catch (error) {
        console.log("Error in sending mail ", error.message);
        
        
    }
}