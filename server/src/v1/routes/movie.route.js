const router = require('express').Router()

const movieController = require('../controllers/movie.controller')
const pagination = require('../utils/pagination.service')
const midderware = require('../utils/middleware.service')

// GET /api/v1/movie
// Get all movies order by modified 
router.get('/all', pagination.midderware, movieController.getMovies)

// GET /api/v1/movie/detail
// Get movie detail by slug
router.get('/detail', movieController.getMovieDetail)


// GET /api/v1/movie/episodes
// Get episodes by slug
router.get('/episodes', midderware.isLoggingIn, midderware.isMember, movieController.getEpisodes)


module.exports = router