const router = require('express').Router()

const userController = require('../controllers/user.controller')
const midderware = require('../utils/middleware.service')

router.post('/change-email', midderware.isLoggingIn, userController.changeEmail)

// Admin routes
router.get('/', midderware.isLoggingIn, midderware.isAdmin, userController.getUser)
router.delete('/', midderware.isLoggingIn, midderware.isAdmin, userController.deleteUser)
router.put('/', midderware.isLoggingIn, midderware.isAdmin, userController.lockUser)
router.post('/', midderware.isLoggingIn, midderware.isAdmin, userController.addRole)

module.exports = router