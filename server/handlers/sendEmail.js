import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import winston from 'winston';


dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'email.log' }),
    ],
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./handlebars'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./handlebars'),
    extName: '.hbs',
};
transporter.use('compile', nodemailerExpressHandlebars(handlebarOptions));
transporter.use('compile', hbs(handlebarOptions));

const sendEmail = async (to, subject, template, name, link) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        template: template,
        context: {
            name: name,
            link: link,
        },
        
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        logger.info(`Message sent: ${info.messageId}`);

        return info;
      } catch (error) {
        console.log("Error sending email: ", error);
        logger.error(`Error sending email: ${error.message}`);

        throw error;
      }
};

export default sendEmail;