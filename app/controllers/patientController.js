const { user } = require('../../config/mail-service');
const sendMessage = require('../services/mailService');

// Load Input Validation
const validatePatientInput = require('../validation/patient');

// Load Patient model
const Patient = require('../models/patient');
const Application = require('../models/application');
const WaitingPatient = require('../models/waiting-patients');
const { PatientStatus } = require('../../config/enum');

// @route   POST api/patients
// @desc    Register patient
// @access  Public
exports.registerPatient = async (req, res) => {
    const { errors, isValid } = validatePatientInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const patient = await Patient.findOne({ email: req.body.email });

    if (patient) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    } else {
        const newApplication = new Application({
            title: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            mobilePhone: ''
        });
        const application = await newApplication.save();
        const newPatient = new Patient({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            applicationId: application.id,
        });
        const patient = await newPatient.save();
        res.json(patient);

        // Define the email message
        const message = {
            from: user,
            to: req.body.email,
            subject: "Prophysio v1.0 Patient Registration",
            html: `<a href='http://localhost:3000/patient-portal/${patient._id}'>Click here to access the patient portal</a>`
        };
        sendMessage(message);
    };
}

// @route   GET api/patients/waiting-patients
// @desc    Get Waiting Patients
// @access  Public
exports.getWaitingPatients = async (req, res) => {
    // Find all waiting patients
    const waitingPatients = await WaitingPatient.find();
    res.json(waitingPatients);
};

// @route   POST api/patients/waiting-patients
// @desc    Save Waiting Patients
// @access  Public
exports.saveWaitingPatients = async (req, res) => {
    await WaitingPatient.deleteMany();
    const { waitingPatients } = req.body;
    for (let i = 0; i < waitingPatients.length; i++) {
        const patient = waitingPatients[i];
        const newWaitingPatient = new WaitingPatient(patient);
        await newWaitingPatient.save();
    };
    res.json({ success: true });
}

// @route   POST api/patients
// @desc    Register patient
// @access  Public
exports.confirmRegistration = async (req, res) => {
    // const { errors, isValid } = validatePatientInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { patientId, application } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
        errors.patient = 'You are not registered yet';
        return res.status(404).json(errors);
    } else {
        const updatedApplication = await Application.findOneAndUpdate(
            { _id: patient.applicationId },
            { $set: application }
        );
        res.json(updatedApplication);
    };
}

// @route   GET api/patients
// @desc    Get Patients
// @access  Public
exports.getPatients = async (req, res) => {
    // Find all patients
    const patients = await Patient.find()
    res.json(patients);
};

// @route   GET api/patients/:id
// @desc    Get Patient
// @access  Public
exports.getPatient = async (req, res) => {
    const errors = {};

    const { id } = req.params;

    // Find patient by id
    const patient = await Patient.findById(id);
    // Check for patient
    if (!patient) {
        errors.msg = 'Patient not found';
        return res.status(404).json(errors);
    }
    res.json(patient);
};