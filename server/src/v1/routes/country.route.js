const router = require('express').Router()

const paginationService = require('../utils/pagination.service')
const middleware = require('../utils/middleware.service')
const countryController = require('../controllers/country.controller')

// GET /api/v1/category/all
// Get all categories
router.get('/all', paginationService.midderware, countryController.all)

// POST /api/v1/category/create
// Create a new category
router.post('/create', middleware.isLoggingIn, middleware.isAdmin, countryController.create)

// PUT /api/v1/category/update
// Update a category
router.put('/update', middleware.isLoggingIn, middleware.isAdmin, countryController.update)

// DELETE /api/v1/category/delete
// Delete a category
router.delete('/delete', middleware.isLoggingIn, middleware.isAdmin, countryController.delete)

// GET /api/v1/category/search
// Search categories
router.get('/search', paginationService.midderware, countryController.search)

module.exports = router