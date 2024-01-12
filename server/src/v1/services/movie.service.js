const movieRepo = require('../repositories/movie.repository')
const paginationService = require('../utils/pagination.service')

const getMovies = async ({ current_page, limit_page, category_id, country_id, year, type, status }) => {
	const total_item = await movieRepo.count()

	const offset = (current_page - 1) * limit_page
	const data = await movieRepo.all({
		limit: limit_page,
		offset,
		category_id,
		country_id,
		year,
		type,
		status
	})

	return {
		status: 200,
		message: 'Get movies successfully',
		elements: paginationService.to_form({
			current_page,
			total_item,
			data,
			limit: limit_page
		})
	}
}

module.exports = {
	getMovies
}