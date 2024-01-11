const router = require('express').Router()
const middleware = require('../utils/middleware.service')

const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)

router.post('/register', authController.register)

router.get('/logout', middleware.isLoggingIn, authController.logout)

router.post('/refresh-token', middleware.isLoggingIn, authController.refreshToken)

router.post('/forgot-password', authController.forgotPassword)

router.post('/reset-password', authController.resetPassword)

router.post('/verify', middleware.isLoggingIn, authController.verifyEmail)

router.post('/send-otp', middleware.isLoggingIn, authController.sendOTP)

module.exports = router
