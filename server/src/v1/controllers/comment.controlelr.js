const commentService = require('../services/comment.service')

module.exports = {
	getComments: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination
			const { slug, movie_id, user_id } = req.query

			const resp = await commentService.getComments({ current_page, limit_page, slug, movie_id, user_id })
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

			const resp = await commentService.addComment({ movie_id, user_id: id, content })

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

			const resp = await commentService.updateComment({ comment_id, user_id: id, content })
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

			const resp = await commentService.deleteComment({ comment_id, user_id: id })
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