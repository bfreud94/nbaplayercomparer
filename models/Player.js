// Imports for external dependencies
const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

// Create schema
const PlayerSchema = mongoose.Schema({
    name: requiredString,
    pts: requiredString,
    reb: requiredString,
    ast: requiredString,
    stl: requiredString,
    blk: requiredString
});

module.exports = mongoose.model('players', PlayerSchema);
