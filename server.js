const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const middlewares = require('./middlewares')

require('dotenv').config()

const playerRoutes = require('./routes/players')

const app = express()

app.disable('etag')

const port = process.env.PORT || 8000

app.use(express.json())

app.use(morgan('common'))

app.use(helmet({
    contentSecurityPolicy: false
}))

app.use(cors())

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('nba-player-comparer-client/build'))
}

app.use('/nbaPlayerComparer/api', playerRoutes)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}`)
})

mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to Database')
})