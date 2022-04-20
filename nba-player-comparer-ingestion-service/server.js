const mongoose = require('mongoose')
const nba = require('nba')

const Player = require('./models/Player')
const { getCurrentYear } = require('./util')

require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    const total = await Player.collection.countDocuments()
    console.log(total)
    if (err || total > 0) {
        console.log(total > 0 ? `Database already populated with ${total} records` : err)
    } else {
        console.log(`Successfully connected to MongoDB`)

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
                console.log(error)
            }
            return null
        })
        Promise.all(playerPromises).then((data) => {
            console.log(`Successfully wrote ${data.length} records to the database!`)
            console.log(`Successfully closed MongoDB connection`)
            mongoose.connection.close()
        })
    }
})