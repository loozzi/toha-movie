const enpisodeService = require('../services/episode.service')

module.exports = {
	create: async (req, res, next) => {
		try {
			const { name, slug, filename, video_url, m3u8_url, server_id } = req.body
			const episode = { name, slug, filename, video_url, m3u8_url }
			if (!name || !slug || !filename || !video_url || !m3u8_url || !server_id) {
				return res.json({
					status: 400,
					message: 'Missing required fields'
				})
			}

			const resp = await enpisodeService.create({ server_id, episode })
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
			const { name, slug, filename, video_url, m3u8_url, server_id, old_slug } = req.body
			const episode = { name, slug, filename, video_url, m3u8_url }
			if (!name || !slug || !filename || !video_url || !m3u8_url || !server_id || !old_slug) {
				return res.json({
					status: 400,
					message: 'Missing required fields'
				})
			}

			const resp = await enpisodeService.update({ server_id, episode, old_slug })
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