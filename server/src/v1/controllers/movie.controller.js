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
	getMovieDetail: async (req, res, next) => {
		try {
			const { slug } = req.query
			const resp = await movieService.getMovieDetail(slug)
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	getEpisodes: async (req, res, next) => {
		try {
			const { slug } = req.query
			const resp = await movieService.getEpisodes(slug)
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