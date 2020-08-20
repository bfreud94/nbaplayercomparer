// Imports for external dependencies
const mongoose = require('mongoose');

// Create schema
const PlayerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pts: {
    type: String,
    required: true
  },
  reb:  {
    type: String,
    required: true
  },
  ast: {
    type: String,
    required: true
  },
  stl: {
    type: String,
    required: true
  },
  blk: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('players', PlayerSchema);
