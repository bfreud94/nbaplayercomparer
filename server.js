// Imports for external dependencies
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Imports for internal dependencies
const middlewares = require('./middlewares');

// Dotenv config
require('dotenv').config();

// Routes
const playerRoutes = require('./routes/players');

// Initialize express
const app = express();

// Preventing 304 Status Codes
app.disable('etag');

// Port number
const port = process.env.PORT || 8000;

// Use express body parser
app.use(express.json());

// Use Morgan
app.use(morgan('common'));

// Use Helmet
app.use(helmet());

// Use CORS
app.use(cors({
    origin: process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:3000' : ''
}));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('nba-player-comparer-client/build'));
}

// Use Express routes
app.use('/nbaPlayerComparer/api', playerRoutes);

// Use custom middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Starting server
app.listen(port, () => {
    // Logging server successfully started
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}`);
});

// Connecting to the Database
mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to Database');
});