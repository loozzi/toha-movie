const actorRepo = require('../repositories/actor.repository')
const paginationService = require('../utils/pagination.service')

const all = async ({ current_page, limit_page }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit

	const totalItems = await actorRepo.count()

	const actors = await actorRepo.all({ limit, offset })

	return {
		status: 200,
		message: 'success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: actors
		})
	}
}

const create = async ({ name, slug, img_url }) => {
	if (await actorRepo.findOneBySlug(slug)) {
		return {
			status: 400,
			message: 'Slug already exist'
		}
	}

	if (await actorRepo.create({ name, slug, img_url })) {
		return {
			status: 200,
			message: 'success'
		}
	}

	return {
		status: 500,
		message: 'Internal Server Error'
	}
}

const update = async ({ id, name, slug, img_url }) => {
	if (await actorRepo.findOneBySlug(slug)) {
		return {
			status: 400,
			message: 'Slug already exist'
		}
	}

	if (await actorRepo.update({ id, name, slug, img_url })) {
		return {
			status: 200,
			message: 'success'
		}
	}

	return {
		status: 500,
		message: 'Internal Server Error'
	}
}

const remove = async ({ id }) => {
	if (await actorRepo.remove({ id })) {
		return {
			status: 200,
			message: 'success'
		}
	}

	return {
		status: 500,
		message: 'Internal Server Error'
	}
}

const search = async ({ current_page, limit_page, name, slug }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit
	const totalItems = await actorRepo.countSearch({ name, slug })
	const actors = await actorRepo.search({ limit, offset, name, slug })

	return {
		status: 200,
		message: 'success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: actors
		})
	}
}

module.exports = {
	all,
	create,
	update,
	remove,
	search
}