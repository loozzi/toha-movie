const historyRepo = require('../repositories/history.repository')
const paginationService = require('../utils/pagination.service')


const all = async ({ user_id, current_page, limit_page }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const total = await historyRepo.count({ user_id })
	const histories = await historyRepo.all({ user_id, limit, offset })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: total,
			data: histories
		})
	}
}

const create = async ({ user_id, movie_id }) => {
	const isCreated = await historyRepo.create({ user_id, movie_id })

	return {
		status: isCreated ? 200 : 400,
		message: isCreated ? 'Success' : 'Cannot create history'

	}
}

const remove = async ({ user_id, movie_id }) => {
	const isDeleted = await historyRepo.delete({ user_id, movie_id })

	return {
		status: isDeleted ? 200 : 400,
		message: isDeleted ? 'Success' : 'Cannot delete history'
	}
}

module.exports = {
	all,
	create,
	delete: remove
}