const router = require('express').Router()

const paginationService = require('../utils/pagination.service')
const midderware = require('../utils/middleware.service')
const actorController = require('../controllers/actor.controller')

// GET: /api/v1/actor/all
// Get all actors
router.get('/all', paginationService.midderware, actorController.all)

// POST: /api/v1/actor/create
// Create new actor
router.post('/create', midderware.isLoggingIn, midderware.isAdmin, actorController.create)

// PUT: /api/v1/actor/update
// Update actor
router.put('/update', midderware.isLoggingIn, midderware.isAdmin, actorController.update)

// DELETE: /api/v1/actor/delete
// Delete actor
router.delete('/delete', midderware.isLoggingIn, midderware.isAdmin, actorController.delete)

// GET: /api/v1/actor/search
// Search actor
router.get('/search', paginationService.midderware, actorController.search)

module.exports = router