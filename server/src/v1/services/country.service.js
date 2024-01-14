const countryRepo = require('../repositories/country.repository')
const paginationService = require('../utils/pagination.service')

const all = async ({ current_page, limit_page }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const totalItems = await countryRepo.count()

	const countries = await countryRepo.all({ limit, offset })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: countries
		})
	}
}

const create = async ({ name, slug }) => {
	return {
		status: 404,
		message: 'Route not found'
	}
}

const update = async ({ id, name, slug }) => {
	return {
		status: 404,
		message: 'Route not found'
	}
}

const remove = async ({ id }) => {
	return {
		status: 404,
		message: 'Route not found'
	}
}

const search = async ({ current_page, limit_page, name, slug }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const totalItems = await countryRepo.countSearch({ name, slug })

	const countries = await countryRepo.search({ limit, offset, name, slug })

	return {
		status: 200,
		message: 'Success',
		elements: paginationService.to_form({
			current_page,
			limit,
			total_item: totalItems,
			data: countries
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