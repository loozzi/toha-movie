const router = require('express').Router()

const categoryController = require('../controllers/category.controller')


// GET /api/v1/category/all
// Get all categories
router.get('/all', categoryController.all)

module.exports = router