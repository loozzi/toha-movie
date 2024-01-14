const directorService = require('../services/director.service')

module.exports = {
	all: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination
			const resp = await directorService.all({ current_page, limit_page })
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
			const { name, slug } = req.body

			if (!name || !slug) {
				return res.json({
					status: 400,
					message: 'Required fields are missing'
				})
			}

			const resp = await directorService.create({ name, slug })
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
			const { id, name, slug } = req.body

			if (!id || !name || !slug) {
				return res.json({
					status: 400,
					message: 'Required fields are missing'
				})
			}

			const resp = await directorService.update({ id, name, slug })
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
			const { id } = req.query

			if (!id) {
				return res.json({
					status: 400,
					message: 'Required fields are missing'
				})
			}

			const resp = await directorService.delete({ id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	search: async (req, res, next) => {
		const { current_page, limit_page } = res.pagination
		const { name, slug } = req.query

		if (!name && !slug) {
			return res.json({
				status: 400,
				message: 'Required fields are missing'
			})
		}

		const resp = await directorService.search({ current_page, limit_page, name, slug })
		res.json(resp)
	}
}