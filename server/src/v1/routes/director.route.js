const router = require('express').Router()

const directorController = require('../controllers/director.controller')
const middleware = require('../utils/middleware.service')
const paginationService = require('../utils/pagination.service')

// GET /api/v1/director/all
// Get all directors
router.get('/all', paginationService.midderware, directorController.all)

// POST /api/v1/director/create
// Create a director
router.post('/create', middleware.isLoggingIn, middleware.isAdmin, directorController.create)

// PUT /api/v1/director/update
// Update a director
router.put('/update', middleware.isLoggingIn, middleware.isAdmin, directorController.update)

// DELETE /api/v1/director/delete
// Delete a director
router.delete('/delete', middleware.isLoggingIn, middleware.isAdmin, directorController.delete)

// GET /api/v1/director/search
// Search directors by name
router.get('/search', paginationService.midderware, directorController.search)

module.exports = router