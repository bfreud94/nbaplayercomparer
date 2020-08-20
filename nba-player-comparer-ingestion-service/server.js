// Imports for external dependencies
const cron = require('node-cron');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const nba = require('nba');

// Imports for internal dependencies
const Player = require('./models/Player');

// Dotenv config
require('dotenv').config();

cron.schedule('0,10,20,30,40,50 * * * * *', () => {
    // Connect to MongoDB upon server startup
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, async (err) =>   {
        if(err) {
            console.log(err)
        } else {
            const date = new Date().toISOString();
            console.log(`Successfully connected to MongoDB at ${date.substring(0, date.length - 5)}`);
        }
        let rawPlayerData = await nba.stats.playerStats();
        let playerPromises = rawPlayerData.leagueDashPlayerStats.map( async (playerData) => {
            const player = new Player({
                name: playerData.playerName,
                pts: playerData.pts,
                reb: playerData.reb,
                ast: playerData.ast,
                stl: playerData.stl,
                blk: playerData.blk
            });
            try {
                const savedPlayer = await player.save();
                return savedPlayer;
            } catch(err) {
                console.log(err);
            }
        });
        Promise.all(playerPromises).then((data) => {
            const date = new Date().toISOString();
            console.log(`Successfully wrote ${data.length} records to the database!`);
            console.log(`Successfully closed MongoDB connection at ${date.substring(0, date.length - 5)}\n`);
            mongoose.connection.close();
        });
    });
});