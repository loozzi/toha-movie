const historyService = require('../services/history.service')

module.exports = {
	all: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination
			const { id } = res.data

			const resp = await historyService.all({
				user_id: id,
				current_page,
				limit_page
			})
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	create: async (req, res, next) => {
		try {
			const { id } = res.data
			const { movie_id } = req.body

			if (!movie_id) {
				return res.json({
					status: 400,
					message: 'Requires field movie_id'
				})
			}

			const resp = await historyService.create({
				user_id: id,
				movie_id
			})
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	delete: async (req, res, next) => {
		try {
			const { id } = res.data
			const { movie_id } = req.query

			if (!movie_id) {
				return res.json({
					status: 400,
					message: 'Requires field movie_id'
				})
			}
			const resp = await historyService.delete({
				user_id: id,
				movie_id
			})

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