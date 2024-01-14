const router = require('express').Router()

const categoryController = require('../controllers/category.controller')
const middleware = require('../utils/middleware.service')
const paginationService = require('../utils/pagination.service')


// GET /api/v1/category/all
// Get all categories
router.get('/all', paginationService.midderware, categoryController.all)

// POST /api/v1/category/create
// Create a new category
router.post('/create', middleware.isLoggingIn, middleware.isAdmin, categoryController.create)

// PUT /api/v1/category/update
// Update a category
router.put('/update', middleware.isLoggingIn, middleware.isAdmin, categoryController.update)

// DELETE /api/v1/category/delete
// Delete a category
router.delete('/delete', middleware.isLoggingIn, middleware.isAdmin, categoryController.delete)

module.exports = router