const { readFileSync } = require('fs');
const ejs = require('ejs');

// Load Input Validation
const validateAppointmentInput = require('../validation/appointment');

const sendMessage = require('../services/mailService');

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

    const theme = readFileSync('./reminder/appointment-new.ejs', 'utf8');
    const content = ejs.render(theme, {
        service,
        branch,
        practitioner,
        room,
        patient
    });
    // Define the email message
    const message = {
        dest: patient.email,
        subject: 'Prophysio v1.0 Appointment',
        content
    };
    sendMessage(message);
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

    const appointment = await Appointment.findOneAndUpdate(
        { _id: req.body.id },
        { $set: req.body }
    );
    res.json(appointment);
}

// @route   DELETE api/appointments
// @desc    Delete appointment
// @access  Public
exports.deleteAppointment = async (req, res) => {
    await Appointment.findOneAndRemove({ _id: req.params.id });
    res.json({ success: true });
}