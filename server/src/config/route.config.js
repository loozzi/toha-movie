const router = require('express').Router()

const v1Route = require('../v1/v1.route')


router.use('/api/v1', v1Route)

// Default route
router.use('/', (req, res) => {
	res.json({
		status: 405,
		message: 'Method Not Allowed',
	})
})

// Error logs
router.use((err, req, res, next) => {
	console.log(`${req.url}----${req.method}----${err.message}`)
	res.json({
		status: err.status || 500,
		message: err.message || 'Internal Server Error',
	})
})


module.exports = router