const router = require('express').Router()

const userController = require('../controllers/user.controller')
const midderware = require('../utils/middleware.service')
const pagination = require('../utils/pagination.service')

// POST /api/v1/user/change-email
// Change email
router.post('/change-email', midderware.isLoggingIn, userController.changeEmail)

// POST /api/v1/user/mark
// Mark movie by type: watched, favorite, other
router.post('/mark', midderware.isLoggingIn, midderware.isMember, userController.markMovie)

// ADMIN ROUTES
// GET /api/v1/user
// Get all users
router.get('/', midderware.isLoggingIn, midderware.isAdmin, pagination.midderware, userController.getUsers)

// PUT /api/v1/user/band
// Lock user
router.put('/band', midderware.isLoggingIn, midderware.isAdmin, userController.lockUser)

// PUT /api/v1/user/add
// Add role for user
router.post('/add', midderware.isLoggingIn, midderware.isAdmin, userController.addRole)

// PUT /api/v1/user/remove
// Remove role for user
router.post('/remove', midderware.isLoggingIn, midderware.isAdmin, userController.removeRole)

module.exports = router