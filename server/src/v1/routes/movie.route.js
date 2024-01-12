const router = require('express').Router()

const movieController = require('../controllers/movie.controller')
const pagination = require('../utils/pagination.service')

// GET /api/v1/movie
// Get all movies order by modified 
router.get('/all', pagination.midderware, movieController.getMovies)

module.exports = router