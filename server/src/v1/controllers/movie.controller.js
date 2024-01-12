const movieService = require('../services/movie.service')

module.exports = {
	getMovies: async (req, res, next) => {
		try {
			const { category_id, country_id, year, type, status } = req.query
			const { current_page, limit_page } = res.pagination
			const resp = await movieService.getMovies({ current_page, limit_page, category_id, country_id, year, type, status })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
}