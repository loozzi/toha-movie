const router = require('express').Router()

const userController = require('../controllers/user.controller')
const midderware = require('../utils/middleware.service')
const pagination = require('../utils/pagination.service')

router.post('/change-email', midderware.isLoggingIn, userController.changeEmail)

// Admin routes
router.get('/', midderware.isLoggingIn, midderware.isAdmin, pagination.midderware, userController.getUsers)
router.put('/band', midderware.isLoggingIn, midderware.isAdmin, userController.lockUser)
router.post('/add', midderware.isLoggingIn, midderware.isAdmin, userController.addRole)
router.post('/remove', midderware.isLoggingIn, midderware.isAdmin, userController.removeRole)

module.exports = router