const express = require('express');
const path = require('path');
const app = require('./config/app');
const connectDB = require('./config/database');
const { serverPort } = require('./config/key');

// Connect to the database
connectDB();

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('prophysio-ui/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'prophysio-ui', 'build', 'index.html'));
    });
}

const port = process.env.PORT || serverPort;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});