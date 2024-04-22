"use strict";

require('dotenv').config();

const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (mailObj) => {
    const { to, subject } = mailObj;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const info = await transporter.sendMail({
            to: to,
            subject: subject,
            html: {
                path: path.resolve(__dirname, "../src/template/mail.html")
            }
        });

        const successString = `Message sent: ${info.messageId}`;

        console.log(successString);
        
        return successString;
    } catch(err) {
        console.error(err);
        throw new Error(`Something went wrong in sendMail method. Error: ${err.message}`)
    }
}

module.exports = sendEmail;

