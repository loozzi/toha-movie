const router = require('express').Router()

const historyController = require('../controllers/history.controller')
const middleware = require('../utils/middleware.service')
const paginationService = require('../utils/pagination.service')

// GET /api/v1/history/all
// Get all history
router.get('/all',
	middleware.isLoggingIn,
	middleware.isMember,
	paginationService.midderware,
	historyController.all)

// POST /api/v1/history/create
// Create a history
router.post('/create',
	middleware.isLoggingIn,
	middleware.isMember,
	historyController.create)

// DELETE /api/v1/history/delete
// Delete a history
router.delete('/delete',
	middleware.isLoggingIn,
	middleware.isMember,
	historyController.delete)

module.exports = router