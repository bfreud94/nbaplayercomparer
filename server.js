// Imports for external dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Initialize express
const app = express();

// Routes
const playerRoutes = require('./routes/players');

// Dotenv config
require('dotenv').config();

// Port number
const port = process.env.PORT || 8000;

// Use bodyParser
app.use(bodyParser.json());

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('nba-player-comparer-client/build'));
}

// Use CORS if running locally
if(process.env.NODE_ENV.trim() === 'development') {
    app.use(cors());
}

// Starting server
app.listen(port, () =>  {
    // Logging server successfully started
    console.log('Server started on port ' + port);
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () =>   {
        console.log('Successfully connected to MongoDB');
    });
});

// Use Express routes
app.use('/nbaPlayerComparer/api', playerRoutes);