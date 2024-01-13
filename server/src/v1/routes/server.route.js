const router = require('express').Router()

const serverController = require('../controllers/server.controller')
const midderware = require('../utils/middleware.service')

// POST /api/v1/server/create
// Create a new server of a movie
router.post('/create', midderware.isLoggingIn, midderware.isAdmin, serverController.create)

// POST /api/v1/server/update
// Update a server of a movie
router.put('/update', midderware.isLoggingIn, midderware.isAdmin, serverController.update)

// DELETE /api/v1/server/delete
// Delete a server of a movie
router.delete('/delete', midderware.isLoggingIn, midderware.isAdmin, serverController.delete)

module.exports = router