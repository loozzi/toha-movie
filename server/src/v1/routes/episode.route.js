const router = require('express').Router()

const enpisodeController = require('../controllers/episode.controller')
const middleware = require('../utils/middleware.service')

// POST /api/v1/episode
// Create new episode
router.post('/create', middleware.isLoggingIn, middleware.isAdmin, enpisodeController.create)

module.exports = router