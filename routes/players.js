// Imports for external dependencies
const express = require('express');

// Initializing Express router
const router = express.Router();

// Imports for internal dependencies
const Player = require('../models/Player');

router.get('/comparePlayers', async (request, response) => {
    const players = await Player.find({
        $or: [
            { name: request.query.player1Name },
            { name: request.query.player2Name }
        ]
    });
    return response.send(players);
});

router.get('/getAllPlayers', async (request, response) => {
    const players = await Player.find({});
    response.send(players);
});

module.exports = router;