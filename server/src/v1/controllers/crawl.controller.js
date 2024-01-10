const crawlService = require('../services/crawl.service')

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const { cur_page, start_page, end_page } = req.query
			const resp = await crawlService.getAll({ cur_page, start_page, end_page })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error'
			})
		}
	},
	getDetail: async (req, res, next) => {
		try {
			const { slug } = req.query
			const resp = await crawlService.getDetail(slug)
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error'
			})
		}
	},
	getUpdate: async (req, res, next) => {
		try {
			const resp = await crawlService.getUpdate()
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error'
			})
		}
	}
}