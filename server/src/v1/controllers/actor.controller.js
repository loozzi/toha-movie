const actorService = require('../services/actor.service')

module.exports = {
	all: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination
			const resp = await actorService.all({ current_page, limit_page })
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
			const { name, slug, img_url } = req.body

			if (!name || !slug) {
				return res.json({
					status: 400,
					message: 'Required fields are missing'
				})
			}

			const resp = await actorService.create({ name, slug, img_url })
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
			const { id, name, slug, img_url } = req.body

			if (!id || !name || !slug) {
				return res.json({
					status: 400,
					message: 'Required fields are missing'
				})
			}

			const resp = await actorService.update({ id, name, slug, img_url })
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

			const resp = await actorService.remove({ id })
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
		try {
			const { current_page, limit_page } = res.pagination
			const { name, slug } = req.query
			const resp = await actorService.search({ current_page, limit_page, name, slug })
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