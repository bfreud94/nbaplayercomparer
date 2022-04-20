const express = require('express')

const router = express.Router()

const Player = require('../models/Player')

router.get('/comparePlayers', async (request, response) => {
    const players = await Player.find({
        $or: [
            { name: request.query.player1Name },
            { name: request.query.player2Name }
        ]
    })
    return response.send(players)
})

router.get('/getAllPlayers', async (request, response) => {
    const players = await Player.find({})
    response.send(players)
})

module.exports = router