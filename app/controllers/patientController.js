const ejs = require('ejs');
const { readFileSync } = require('fs');

const sendMessage = require('../services/mailService');

// Load Input Validation
const validatePatientInput = require('../validation/patient');

// Load Patient model
const Patient = require('../models/patient');
const RegistrationForm = require('../models/registration_form');
const IntakeForm = require('../models/intake_form');
const WaitingPatient = require('../models/waiting_patient');
const { BodyPart } = require('../../config/enum');
const patient = require('../validation/patient');

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
        const newRegistrationForm = new RegistrationForm({
            title: '',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            mobilePhone: req.body.phoneNumber,
            homeAddress: req.body.address
        });
        const registrationForm = await newRegistrationForm.save();
        const newIntakeForm = new IntakeForm();
        const intakeForm = await newIntakeForm.save();
        const newPatient = new Patient({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            emergencyContact: req.body.emergencyContact,
            registrationForm: registrationForm.id,
            intakeForm: intakeForm.id
        });
        const patient = await (await (await newPatient.save()).populate('registrationForm')).populate('intakeForm');
        console.log(patient);
        res.json(patient);

        const theme = readFileSync('./reminder/patient-registration.ejs', 'utf8');
        const content = ejs.render(theme, {
            serverAddress: '64.69.39.138',
            patientId: patient._id
        });
        // Define the email message
        const message = {
            dest: patient.email,
            subject: 'Prophysio v1.0 Patient Registration',
            content: content.replace(/[\n\r]| {2}/g, '')
        };
        console.log(message);
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

    const { patientId, registrationForm } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
        errors.patient = 'You are not registered yet';
        return res.status(404).json(errors);
    } else {
        const updatedRegistrationForm = await RegistrationForm.findOneAndUpdate(
            { _id: patient.registrationForm },
            { $set: registrationForm }
        );
        res.json(updatedRegistrationForm);
    };
}

// @route   GET api/patients
// @desc    Get Patients
// @access  Public
exports.getPatients = async (req, res) => {
    // Find all patients
    const patients = await Patient.aggregate([
        {
            $lookup: {
                from: "registration_forms",
                localField: "registrationForm",
                foreignField: "_id",
                as: "registrationForm"
            }
        },
        {
            $lookup: {
                from: "intake_forms",
                localField: "intakeForm",
                foreignField: "_id",
                as: "intakeForm"
            }
        },
        {
            $addFields: {
                registrationForm: { $arrayElemAt: ["$registrationForm", 0] },
                intakeForm: { $arrayElemAt: ["$intakeForm", 0] }
            }
        }
    ]);
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