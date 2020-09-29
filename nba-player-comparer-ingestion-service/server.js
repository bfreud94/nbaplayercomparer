// Imports for external dependencies
const cron = require('node-cron');
const mongoose = require('mongoose');
const nba = require('nba');

// Imports for internal dependencies
const Player = require('./models/Player');

// Dotenv config
require('dotenv').config();

cron.schedule('0,10,20,30,40,50 * * * * *', () => {
    // Connect to MongoDB upon server startup
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        } else {
            const date = new Date().toISOString();
            // eslint-disable-next-line no-console
            console.log(`Successfully connected to MongoDB at ${date.substring(0, date.length - 5)}`);
        }
        const rawPlayerData = await nba.stats.playerStats();
        const playerPromises = rawPlayerData.leagueDashPlayerStats.map(async (playerData) => {
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
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
            return null;
        });
        Promise.all(playerPromises).then((data) => {
            const date = new Date().toISOString();
            // eslint-disable-next-line no-console
            console.log(`Successfully wrote ${data.length} records to the database!`);
            // eslint-disable-next-line no-console
            console.log(`Successfully closed MongoDB connection at ${date.substring(0, date.length - 5)}\n`);
            mongoose.connection.close();
        });
    });
});