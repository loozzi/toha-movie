const router = require('express').Router()

router.use('/auth', require('./routes/auth.route'))

router.use('/crawl', require('./routes/crawl.route'))

router.use('/user', require('./routes/user.route'))

router.use('/movie', require('./routes/movie.route'))

router.use('/episode', require('./routes/episode.route'))

router.use('/server', require('./routes/server.route'))

router.use('/category', require('./routes/category.route'))

router.use('/director', require('./routes/director.route'))

module.exports = router