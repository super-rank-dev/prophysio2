const ejs = require('ejs');

// Load Input Validation
const validateAppointmentInput = require('../validation/appointment');

const mailService = require('../services/mailService');

// Load Appointment model
const { AppointmentStatus } = require('../../config/enum');
const Appointment = require('../models/appointment');
const Branch = require('../models/branch');
const Service = require('../models/service');
const User = require('../models/user');
const Room = require('../models/room');
const Patient = require('../models/patient');

// @route   POST api/appointments
// @desc    Register appointment
// @access  Public
exports.registerAppointment = async (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newAppointment = new Appointment({
        ...req.body,
        status: AppointmentStatus.BOOKED,
        paidAmount: 0
    });
    const appointment = await newAppointment.save();
    res.json(appointment);

    const branch = await Branch.findById(appointment.branchId);
    const service = await Service.findById(appointment.serviceId);
    const practitioner = await User.findById(appointment.practitionerId);
    const room = await Room.findById(appointment.roomId);
    const patient = await Patient.findById(appointment.patientId);

    // const theme = readFileSync('./reminder/appointment-new.ejs', 'utf8');
    // const content = ejs.render(theme, {
    //     appointment,
    //     service,
    //     branch,
    //     practitioner,
    //     room,
    //     patient
    // });
    // Define the email message
    // const message = {
    //     dest: patient.email,
    //     subject: 'Prophysio v1.0 Appointment',
    //     content: content.replace(/[\n\r]| {2}/g, '')
    // };
    mailService.newAppointment({ service, branch, practitioner, room, patient, appointment });
}

// @route   GET api/appointments
// @desc    Get Appointments
// @access  Public
exports.getAppointments = async (req, res) => {
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find all appointments
    const appointments = await Appointment.find();
    res.json(appointments);
};

// @route   PUT api/appointments
// @desc    Update appointment
// @access  Public
exports.updateAppointment = async (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const appointment = await Appointment.findById(req.body.id);

    if (new Date(appointment.startTime).getTime() !== new Date(req.body.startTime).getTime() ||
        new Date(appointment.endTime).getTime() !== new Date(req.body.endTime).getTime()) {
        const branch = await Branch.findById(req.body.branchId);
        const service = await Service.findById(req.body.serviceId);
        const practitioner = await User.findById(req.body.practitionerId);
        const room = await Room.findById(req.body.roomId);
        const patient = await Patient.findById(req.body.patientId);

        // const theme = readFileSync('./reminder/appointment-reschedule.ejs', 'utf8');
        // const content = ejs.render(theme, {
        //     service,
        //     branch,
        //     practitioner,
        //     room,
        //     patient,
        //     originalAppointment: appointment,
        //     rescheduledAppointment: req.body
        // });
        // console.log(req.body);
        // Define the email message
        // const message = {
        //     dest: patient.email,
        //     subject: 'Prophysio v1.0 Appointment',
        //     content: content.replace(/[\n\r]| {2}/g, '')
        // };
        mailService.updateAppointment({ service, branch, practitioner, room, patient, appointment, reqBody: req.body });
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
        { _id: req.body.id },
        { $set: req.body }
    );
    res.json(updatedAppointment);
}

// @route   DELETE api/appointments
// @desc    Delete appointment
// @access  Public
exports.deleteAppointment = async (req, res) => {
    const appointment = await Appointment.findOneAndRemove({ _id: req.params.id });
    res.json({ success: true });
    
    const branch = await Branch.findById(appointment.branchId);
    const service = await Service.findById(appointment.serviceId);
    const practitioner = await User.findById(appointment.practitionerId);
    const room = await Room.findById(appointment.roomId);
    const patient = await Patient.findById(appointment.patientId);
    mailService.deleteAppointment({ service, branch, practitioner, room, patient, appointment });
}