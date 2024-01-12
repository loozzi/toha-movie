const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	const whereClauses = [
		`md.is_deleted = false`,
		`d.is_deleted = false`,
		`md.movie_id = ${movie_id}`
	]

	const textQuery =
		`select d.id, d.name, d.slug from directors d
		inner join movies_directors md on md.director_id = d.id
		where ${whereClauses.join(' and ')};`

	return await query(textQuery)
}

module.exports = {
	findByMovieId
}