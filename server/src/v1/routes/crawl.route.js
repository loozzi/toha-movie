const router = require('express').Router()

const crawlController = require('../controllers/crawl.controller');

router.get('/get-all', crawlController.getAll)

router.get('/get-detail', crawlController.getDetail)

router.get('/get-update', crawlController.getUpdate)

router.get('/', (req, res) => {
	res.json({
		status: 100,
		message: 'OK',
	})
})

module.exports = router;