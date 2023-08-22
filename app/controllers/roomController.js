// Load Input Validation
// const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');

// Load Room model
const Room = require('../models/room');

// @route   POST api/rooms/
// @desc    Register room
// @access  Public
exports.registerRoom = async (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoom = new Room(req.body);
    const room = await newRoom.save();
    res.json(room);
}

// @route   GET api/rooms
// @desc    Get Rooms
// @access  Public
exports.getRooms = async (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find all rooms
    const rooms = await Room.find();
    res.json(rooms);
};