const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	const whereClauses = [
		`mc.is_deleted = false`,
		`c.is_deleted = false`,
		`mc.movie_id = ${movie_id}`
	]

	const textQuery =
		`select c.id, c.name, c.slug from categories c
		inner join movies_categories mc on mc.category_id = c.id
		where ${whereClauses.join(' and ')};`

	return await query(textQuery)
}

module.exports = {
	findByMovieId
}