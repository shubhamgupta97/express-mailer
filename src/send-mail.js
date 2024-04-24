"use strict";

require('dotenv').config();

const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const sendEmail = async (mailObj, type) => {
    const { to, name } = mailObj;

    let subject = "";
    let templatePath;
    
    switch(type.toLowerCase()) {
        case "registration":
            subject = "Event Registered Successfully";
            templatePath = path.resolve(__dirname, "../src/template/email/registration-success.ejs");
            break;
        case "alert":
            subject = "Event Alert";
            templatePath = path.resolve(__dirname, "../src/template/email/event-alert.ejs");
            break;
    }

    let template;
    
    ejs.renderFile(templatePath, {name: name}, {}, (err, str) => {
        if(err) {
            console.error(err);
        } else {
            template = str;
        }
    })

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
            // html: {
            //     path: path.resolve(__dirname, "../src/template/mail.html")
            // }
            html: template
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

