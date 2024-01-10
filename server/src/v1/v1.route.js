const router = require('express').Router()

const crawlRoute = require('./routes/crawl.route')

router.use('/crawl', crawlRoute)

module.exports = router