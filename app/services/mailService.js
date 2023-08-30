const { exec } = require('child_process');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { readFileSync } = require('fs');

const serverConfig = require('../../config/mail-server');
const { serverAddress } = require('../../config/key');

const sendMessage = async ({ dest, subject, content, data }) => {
    const source = content.toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(data);
    const transporter = nodemailer.createTransport({
        host: serverConfig.host,
        port: serverConfig.port,
        secure: false,
        auth: {
            user: serverConfig.user,
            pass: serverConfig.password
        }
    });
    const mailOptions = {
        from: serverConfig.user,
        to: dest,
        subject: subject,
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

exports.sendNewAppointmentMsg = ({ service, branch, practitioner, room, patient, appointment }) => {
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

exports.sendUpdateAppointmentMsg = ({ service, branch, practitioner, room, patient, appointment, reqBody }) => {
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

exports.sendDeleteAppointmentMsg = ({ service, branch, practitioner, room, patient, appointment }) => {
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

exports.sendRegistrationForm = ({ patient }) => {
    const theme = readFileSync('./reminder/patient-registration-form.html', 'utf8');
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Patient Registration',
        content: theme,
        data: {
            serverAddress,
            patientId: patient._id
        }
    };
    sendMessage(message);
}

exports.sendIntakeForm = ({ patient }) => {
    const theme = readFileSync('./reminder/patient-intake-form.html', 'utf8');
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Patient Questionnaire',
        content: theme,
        data: {
            serverAddress,
            patientId: patient._id
        }
    };
    sendMessage(message);
}