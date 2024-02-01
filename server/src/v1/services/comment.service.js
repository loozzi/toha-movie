const paginationService = require('../utils/pagination.service')
const commentRepo = require('../repositories/comment.repository')


const getComments = async ({ current_page, limit_page, slug, movie_id, user_id }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const total_item = await commentRepo.count({ slug, movie_id, user_id })
	const data = await commentRepo.all({ limit, offset, slug, movie_id, user_id })

	return {
		status: 200,
		message: 'Get comments successfully',
		elements: paginationService.to_form({
			current_page,
			total_item,
			data,
			limit
		})
	}
}

const addComment = async ({ movie_id, user_id, content }) => {
	const isCreated = commentRepo.create({ movie_id, user_id, content })
	return {
		status: isCreated ? 200 : 401,
		message: isCreated ? 'Add comment successfully' : 'Cannot add comment'
	}
}

const updateComment = async ({ comment_id, user_id, content }) => {
	const comment = await commentRepo.findOneById(comment_id)
	if (!comment) {
		return {
			status: 404,
			message: 'Comment not found'
		}
	}

	if (comment.user_id !== user_id) {
		return {
			status: 403,
			message: 'Forbidden'
		}
	}

	const isUpdated = await commentRepo.update({ comment_id, content })

	return {
		status: isUpdated ? 200 : 401,
		message: isUpdated ? 'Update comment successfully' : 'Cannot update comment'
	}
}

const deleteComment = async ({ comment_id, user_id }) => {
	const comment = await commentRepo.findOneById(comment_id)
	if (!comment) {
		return {
			status: 404,
			message: 'Comment not found'
		}
	}

	if (comment.user_id !== user_id) {
		const roles = await roleRepo.getRoles(res.data.id)

		if (roles.some(role => role.slug === 'admin')) {
			const isDeleted = await commentRepo.delete({ comment_id })

			return {
				status: isDeleted ? 200 : 401,
				message: isDeleted ? 'Delete comment successfully' : 'Cannot delete comment'
			}
		}
		return {
			status: 403,
			message: 'Forbidden'
		}
	}

	const isDeleted = await commentRepo.delete({ comment_id })

	return {
		status: isDeleted ? 200 : 401,
		message: isDeleted ? 'Delete comment successfully' : 'Cannot delete comment'
	}
}

module.exports = {
	getComments,
	addComment,
	updateComment,
	deleteComment,
}