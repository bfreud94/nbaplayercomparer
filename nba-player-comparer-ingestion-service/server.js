const mongoose = require('mongoose')
const nba = require('nba')

const Player = require('./models/Player')
const { getCurrentYear } = require('./util')

require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    } else {
        // eslint-disable-next-line no-console
        console.log(`Successfully connected to MongoDB`)
    }
    const year = getCurrentYear()
    const rawPlayerData = await nba.stats.playerStats({
        Season: year
    })
    const playerPromises = rawPlayerData.leagueDashPlayerStats.map(async ({
        playerName,
        pts,
        reb,
        ast,
        stl,
        blk
    }) => {
        const player = new Player({
            name: playerName,
            pts,
            reb,
            ast,
            stl,
            blk
        })
        try {
            const savedPlayer = await player.save()
            return savedPlayer
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
        return null
    })
    Promise.all(playerPromises).then((data) => {
        // eslint-disable-next-line no-console
        console.log(`Successfully wrote ${data.length} records to the database!`)
        // eslint-disable-next-line no-console
        console.log(`Successfully closed MongoDB connection`)
        mongoose.connection.close()
    })
})