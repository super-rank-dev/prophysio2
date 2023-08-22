const nodemailer = require('nodemailer');
const { user, password } = require('../../config/mail-service');

// Create a transporter using SMTP configuration for Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: password
    }
});

// Send the email
const sendMessage = (message) => {
    // transporter.sendMail(message, function (error, info) {
    //     if (error) {
    //         console.log('Error occurred:', error.message);
    //     } else {
    //         console.log('Email sent successfully!', info.response);
    //     }
    // });
};

module.exports = sendMessage;