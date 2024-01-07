const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

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


// Default route
app.use('/', (req, res) => {
	res.json({
		status: 405,
		message: 'Method Not Allowed',
	})
})

// Error logs
app.use((err, req, res, next) => {
	console.log(`${req.url}----${req.method}----${err.message}`)
	res.json({
		status: err.status || 500,
		message: err.message || 'Internal Server Error',
	})
})

module.exports = app