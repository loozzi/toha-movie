const router = require('express').Router()

router.use('/auth', require('./routes/auth.route'))

router.use('/crawl', require('./routes/crawl.route'))

router.use('/user', require('./routes/user.route'))

router.use('/movie', require('./routes/movie.route'))

router.use('/episode', require('./routes/episode.route'))

router.use('/server', require('./routes/server.route'))

module.exports = router