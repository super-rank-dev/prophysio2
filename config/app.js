const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();

require('dotenv').config();

const userRoutes = require('../app/routes/userRoutes');
const patientRoutes = require('../app/routes/patientRoutes');
const appointmentRoutes = require('../app/routes/appointmentRoutes');
const serviceRoutes = require('../app/routes/serviceRoutes');
const branchRoutes = require('../app/routes/branchRoutes');
const roomRoutes = require('../app/routes/roomRoutes');

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./passport')(passport);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/rooms', roomRoutes);

module.exports = app;