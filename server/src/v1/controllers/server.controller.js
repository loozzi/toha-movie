const serverService = require('../services/server.service')

module.exports = {
	create: async (req, res, next) => {
		try {
			const { movie_id, name } = req.body

			if (!movie_id || !name) {
				return res.json({
					status: 400,
					message: 'Missing required fields'
				})
			}

			const resp = await serverService.create({ movie_id, name })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	update: async (req, res, next) => {
		try {
			const { server_id, name } = req.body
			if (!server_id || !name) {
				return res.json({
					status: 400,
					message: 'Missing required fields'
				})
			}

			const resp = await serverService.update({ server_id, name })
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
			const { server_id } = req.query

			if (!server_id) {
				return res.json({
					status: 400,
					message: 'Missing required fields'
				})
			}

			const resp = await serverService.delete({ server_id })
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