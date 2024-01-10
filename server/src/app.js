const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const connector = require('./config/connect')
const routes = require('./config/route.config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('common'))
app.use(cors({
	credentials: true,
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

// Connect to database
connector.connect((err) => {
	if (err) {
		console.log(err)
		throw err
	} else {
		console.log('Database connected')
	}
})

app.use(routes)

module.exports = app