const { exec } = require('child_process');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { readFileSync } = require('fs');

// const sendMessage = ({ dest, subject, content }) => {
//     const command = `echo "${content}" | mail -s "${subject}" -a "Content-type: text/html" ${dest}`;

//     exec(command, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error: ${error.message}`);
//             return;
//         }
//         console.log('Email sent successfully!');
//     });
// };

const sendMessage = async ({ dest, subject, content, data }) => {
    const source = content.toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(data);
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "pro.physio@outlook.com",
            pass: "pro@physio v1.0"
        }
    });
    const mailOptions = {
        from: 'pro.physio@outlook.com',
        to: dest,
        subject: subject,
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

exports.newAppointment = ({ service, branch, practitioner, room, patient, appointment }) => {
    const theme = readFileSync('./reminder/appointment-new.html', 'utf8');
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Appointment',
        content: theme,
        data: {
            service: service._doc,
            branch: branch._doc,
            practitioner: practitioner._doc,
            room: room._doc,
            patient: patient._doc,
            appointment: appointment._doc
        }
    };
    sendMessage(message);
}

exports.updateAppointment = ({ service, branch, practitioner, room, patient, appointment, reqBody }) => {
    const theme = readFileSync('./reminder/appointment-reschedule.html', 'utf8');
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Appointment',
        content: theme,
        data: {
            service: service._doc,
            branch: branch._doc,
            practitioner: practitioner._doc,
            room: room._doc,
            patient: patient._doc,
            originalAppointment: appointment._doc,
            rescheduledAppointment: reqBody
        }
    };
    sendMessage(message);
}

exports.deleteAppointment = ({ service, branch, practitioner, room, patient, appointment }) => {
    const theme = readFileSync('./reminder/appointment-remove.html', 'utf8');
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Appointment',
        content: theme,
        data: {
            service: service._doc,
            branch: branch._doc,
            practitioner: practitioner._doc,
            room: room._doc,
            patient: patient._doc,
            appointment: appointment._doc
        }
    };
    sendMessage(message);
}