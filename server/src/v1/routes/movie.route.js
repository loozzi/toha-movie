const router = require('express').Router()

const movieController = require('../controllers/movie.controller')
const commentController = require('../controllers/comment.controlelr')
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

// GET /api/v1/movie/comment
// Get comments by slug
router.get('/comment', pagination.midderware, commentController.getComments)

// POST /api/v1/movie/comment
// Add comment to movie
router.post('/comment', midderware.isLoggingIn, midderware.isMember, commentController.addComment)

// PUT /api/v1/movie/comment
// Update comment to movie
router.put('/comment', midderware.isLoggingIn, midderware.isMember, commentController.updateComment)

// DELETE /api/v1/movie/comment
// Delete comment to movie
router.delete('/comment', midderware.isLoggingIn, midderware.isMember, commentController.deleteComment)

// POST /api/v1/movie/rate
// Rate movie
router.post('/rate', midderware.isLoggingIn, midderware.isMember, movieController.rateMovie)

// ADMIN Routes
// POST /api/v1/movie/add
// Add new movie
router.post('/add', midderware.isLoggingIn, midderware.isAdmin, movieController.addMovie)

// PUT /api/v1/movie/update
// Update movie
router.put('/update', midderware.isLoggingIn, midderware.isAdmin, movieController.updateMovie)

// DELETE /api/v1/movie/delete
// Delete movie
router.delete('/delete', midderware.isLoggingIn, midderware.isAdmin, movieController.deleteMovie)

module.exports = router