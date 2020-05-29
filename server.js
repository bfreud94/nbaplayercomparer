// Imports for external dependencies
const bodyParser = require('body-parser');
const express = require('express');
const nba = require('nba');
// Initialize express
const app = express();

// Port number
const port = process.env.PORT || 8000;

// Use bodyParser
app.use(bodyParser.json());

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('nba-player-comparer-client/build'));
}

// Starting server
app.listen(port, () =>  {
    // Logging server successfully started
    console.log('Server started on port ' + port);
});

app.get('/nbaPlayerComparer/api/comparePlayers', async (request, response) =>  {
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

app.get('/nbaPlayerComparer/api/getAllPlayers', async (request, response) =>  {
    let rawPlayerData = await nba.stats.playerStats();
    let playerData = [];
    rawPlayerData.leagueDashPlayerStats.forEach((player) => {
        playerData.push({
            name: player.playerName,
            ppg: player.pts,
            rpg: player.reb,
            apg: player.ast,
            spg: player.stl,
            bpg: player.blk
        });
    });
    response.send(playerData);
});