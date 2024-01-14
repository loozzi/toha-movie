const categoryRepo = require('../repositories/category.repository')
const paginationService = require('../utils/pagination.service')

const all = async ({ current_page, limit_page }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit

	const totalItem = await categoryRepo.count()

	const categories = await categoryRepo.all({ limit, offset })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItem,
			data: categories
		})
	}
}

const create = async ({ name, slug }) => {
	const catOld = await categoryRepo.findOneBySlug(slug)
	if (catOld) {
		return {
			status: 400,
			message: 'Category is exist'
		}
	}

	const isCreated = await categoryRepo.create({ name, slug })

	return {
		status: isCreated ? 200 : 500,
		message: isCreated ? 'Success' : 'Failed'
	}
}

const update = async ({ id, name, slug }) => {
	const isExist = await categoryRepo.findOneById(id)
	if (!isExist) {
		return {
			status: 400,
			message: 'Category is not exist'
		}
	}

	const isUpdated = await categoryRepo.update({ id, name, slug })

	return {
		status: isUpdated ? 200 : 500,
		message: isUpdated ? 'Success' : 'Failed'
	}
}

const remove = async ({ id }) => {
	const isExist = await categoryRepo.findOneById(id)
	if (!isExist) {
		return {
			status: 400,
			message: 'Category is not exist'
		}
	}

	const isDeleted = await categoryRepo.remove({ id })

	return {
		status: isDeleted ? 200 : 500,
		message: isDeleted ? 'Success' : 'Failed'
	}
}

module.exports = {
	all,
	create,
	update,
	delete: remove
}