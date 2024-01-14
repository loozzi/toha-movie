const directorRepo = require('../repositories/director.repository')
const paginationService = require('../utils/pagination.service')


const all = async ({ current_page, limit_page }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const totalItems = await directorRepo.count()

	const directors = await directorRepo.all({ limit, offset })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: directors
		})
	}

}

const create = async ({ name, slug }) => {
	const director = await directorRepo.findOneBySlug(slug)
	if (director) {
		return {
			status: 400,
			message: 'Slug already exists'
		}
	}

	const isCreated = await directorRepo.create({ name, slug })

	return {
		status: isCreated ? 200 : 500,
		message: isCreated ? 'Success' : 'Failed'
	}
}

const update = async ({ id, name, slug }) => {
	const directorOld = await directorRepo.findOneById(id)
	if (!directorOld) {
		return {
			status: 400,
			message: 'Director not found'
		}
	}

	const director = await directorRepo.findOneBySlug(slug)
	if (director && director.id !== parseInt(id)) {
		return {
			status: 400,
			message: 'Slug already exists'
		}
	}

	const isUpdated = await directorRepo.update({ id, name, slug })

	return {
		status: isUpdated ? 200 : 500,
		message: isUpdated ? 'Success' : 'Failed'
	}
}

const remove = async ({ id }) => {
	const isExist = await directorRepo.findOneById(id)
	if (!isExist) {
		return {
			status: 400,
			message: 'Director not found'
		}
	}

	const isDeleted = await directorRepo.remove({ id })

	return {
		status: isDeleted ? 200 : 500,
		message: isDeleted ? 'Success' : 'Failed'
	}
}

const search = async ({ current_page, limit_page, name, slug }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const totalItems = await directorRepo.countSearch({ name, slug })

	const directors = await directorRepo.search({ limit, offset, name, slug })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: directors
		})
	}
}

module.exports = {
	all,
	create,
	update,
	delete: remove,
	search
}