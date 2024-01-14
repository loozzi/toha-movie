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
				name, origin_name, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang, slug, year,
				poster_url,
				chieurap: chieurap ? chieurap : false,
				showtimes: showtimes ? showtimes : '',
				view: 0,
				categories: categories ?? [],
				countries: countries ?? [],
				directors: directors ?? [],
				actors: actors ?? [],
				content: content ?? ''
			}

			if (!name || !origin_name || !type || !status
				|| !thumb_url || !time || !episode_total || !episode_current
				|| !quality || !lang || !year || !slug
				|| !trailer_url || !poster_url) {
				return res.json({
					status: 400,
					message: 'Invalid data'
				})
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
	},
	updateMovie: async (req, res, next) => {
		try {
			const { id, name, origin_name, content, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang,
				showtimes, slug, year, chieurap, poster_url,
				categories, countries, directors, actors
			} = req.body

			const payload = {
				id, name, origin_name, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang, slug, year,
				poster_url,
				chieurap: chieurap ? chieurap : false,
				showtimes: showtimes ? showtimes : '',
				categories: categories ?? [],
				countries: countries ?? [],
				directors: directors ?? [],
				actors: actors ?? [],
				content: content ?? ''
			}

			if (!id || !name || !origin_name || !type || !status
				|| !thumb_url || !time || !episode_total || !episode_current
				|| !quality || !lang || !year || !slug
				|| !trailer_url || !poster_url) {
				return res.json({
					status: 400,
					message: 'Invalid data'
				})
			}

			const resp = await movieService.updateMovie(payload)
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	deleteMovie: async (req, res, next) => {
		try {
			const { id } = req.query
			if (!id) {
				return res.json({
					status: 400,
					message: 'Missing id'
				})
			}
			const resp = await movieService.deleteMovie(id)
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	getComments: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination
			const { slug, movie_id, user_id } = req.query

			const resp = await movieService.getComments({ current_page, limit_page, slug, movie_id, user_id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	addComment: async (req, res, next) => {
		try {
			const { movie_id, content } = req.body
			const { id } = res.data
			if (!movie_id || !content) {
				return res.json({
					status: 400,
					message: 'Require fields are missing'
				})
			}

			const resp = await movieService.addComment({ movie_id, user_id: id, content })

			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	updateComment: async (req, res, next) => {
		try {
			const { comment_id, content } = req.body
			const { id } = res.data
			if (!comment_id || !content) {
				return res.json({
					status: 400,
					message: 'Require fields are missing'
				})
			}

			const resp = await movieService.updateComment({ comment_id, user_id: id, content })
			res.json(resp)

		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	deleteComment: async (req, res, next) => {
		try {
			const { comment_id } = req.query
			const { id } = res.data
			if (!comment_id) {
				return res.json({
					status: 400,
					message: 'Require fields are missing'
				})
			}

			const resp = await movieService.deleteComment({ comment_id, user_id: id })
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