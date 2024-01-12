const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	const whereClauses = [
		`mct.is_deleted = false`,
		`ct.is_deleted = false`,
		`mct.movie_id = ${movie_id}`
	]

	const textQuery =
		`select ct.id, ct.name, ct.slug from countries ct
		inner join movies_countries mct on mct.country_id = ct.id
		where ${whereClauses.join(' and ')};`

	return await query(textQuery)
}

module.exports = {
	findByMovieId
}