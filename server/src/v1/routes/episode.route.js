const router = require('express').Router()

const enpisodeController = require('../controllers/episode.controller')
const middleware = require('../utils/middleware.service')

// POST /api/v1/episode/create
// Create new episode
router.post('/create', middleware.isLoggingIn, middleware.isAdmin, enpisodeController.create)

// PUT /api/v1/episode/update
// Update episode by server_id and old slug
router.put('/update', middleware.isLoggingIn, middleware.isAdmin, enpisodeController.update)

module.exports = router