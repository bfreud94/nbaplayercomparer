// Imports for external dependencies
const express = require('express');

// Initializing Express router
const router = express.Router();

// Imports for internal dependencies
const Player = require('../models/Player');

router.get('/comparePlayers', async (request, response) =>  {
    let playerData = [];
    for(let key in request.query) {
        let player = nba.findPlayer(request.query[key])
        if(player == null) {
            response.status(404);
            return response.send("Error: Player " + request.query[key] + " does not exist.")
        }
        await nba.stats.playerStats({PlayerID: player.playerId}).then((data) => {
            for(let index in data.leagueDashPlayerStats)    {
                let currentPlayer = data.leagueDashPlayerStats[index];
                if(currentPlayer.playerName == player.fullName)   {
                    playerData.push(currentPlayer);
                }
            }
        });
    }
    return response.send(playerData);
});

router.get('/getAllPlayers', async (request, response) =>  {
    const players = await Player.find({});
    response.send(players);
});


module.exports = router;