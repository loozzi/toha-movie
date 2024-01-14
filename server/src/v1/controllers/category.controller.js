const categoryService = require('../services/category.service');

module.exports = {
	all: async (req, res, next) => {
		try {
			const resp = await categoryService.all()
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	}
}