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
	},
	addMovie: async (req, res, next) => {
		try {
			const { name, origin_name, content, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang,
				showtimes, slug, year, chieurap, poster_url,
				categories, countries, directors, actors
			} = req.body

			const payload = {
				name, origin_name, content, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang, slug, year,
				chieurap, poster_url,
				showtimes: showtimes ? showtimes : '', view: 0
			}

			if (!name || !origin_name || !type || !status || !thumb_url || !time || !episode_total || !quality || !lang || !year || !slug || !chieurap) {
				return res.json({
					status: 401,
					message: 'Invalid data'
				})
			}

			if (!content) {
				payload.content = ''
			}

			const resp = await movieService.addMovie(payload)
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