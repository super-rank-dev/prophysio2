// Load Input Validation
// const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');

// Load Service model
const Service = require('../models/service');
const Application = require('../models/application');

// @route   POST api/services/
// @desc    Register service
// @access  Public
exports.registerService = async (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newService = new Service(req.body);
    const service = await newService.save();
    res.json(service);
}

// @route   GET api/services
// @desc    Get Services
// @access  Public
exports.getServices = async (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find all services
    const services = await Service.find();
    res.json(services);
};