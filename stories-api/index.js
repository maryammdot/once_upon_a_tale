'use strict'
// require('dotenv').config()
// require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const PORT = 5000
const MONGO_URL = 'mongodb://user:user123@ds127704.mlab.com:27704/stories-app'

const { mongoose } = require('stories-data')
const express = require('express')
const pack = require('./package.json')
const router = require('./routes')
const cors = require('./utils/cors')

// const { env: { PORT, MONGO_URL } } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log(`db server running at ${MONGO_URL}`)

        const { argv: [, , port = PORT || 8080] } = process

        const app = express()

        app.use(cors)

        app.use('/api', router)

        app.listen(port, () => console.log(`${pack.name} ${pack.version} up and running on port ${port}`))
    })
    .catch(console.error)