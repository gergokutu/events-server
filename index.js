const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const Event = require('./event/model')
const router = require('./event/router')

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.use(router)

app.listen(port, () => console.log(`This app listening on ${port}.`))