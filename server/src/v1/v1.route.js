const router = require('express').Router()

router.use('/auth', require('./routes/auth.route'))

router.use('/crawl', require('./routes/crawl.route'))

router.use('/user', require('./routes/user.route'))

router.use('/movie', require('./routes/movie.route'))

router.use('/episode', require('./routes/episode.route'))

router.use('/server', require('./routes/server.route'))

router.use('/category', require('./routes/category.route'))

router.use('/director', require('./routes/director.route'))

router.use('/country', require('./routes/country.route'))

router.use('/actor', require('./routes/actor.route'))

router.use('/history', require('./routes/history.route'))

module.exports = router