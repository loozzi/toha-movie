const router = require('express').Router()

router.use('/auth', require('./routes/auth.route'))

router.use('/crawl', require('./routes/crawl.route'))

router.use('/user', require('./routes/user.route'))

module.exports = router