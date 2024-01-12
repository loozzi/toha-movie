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

const findOneBySlug = async (slug) => {
	return (await query(`select * from countries where slug = '${slug}' and is_deleted = false`))[0]
}

const create = async ({ name, slug }) => {
	try {
		await query(`insert into countries set ?`, { name, slug })
		return true
	} catch (err) {
		return false
	}
}

const addMovie = async ({ movie_id, country_id }) => {
	try {
		await query(`insert into movies_countries set ?`, { movie_id, country_id })
		return true
	} catch (err) {
		return false
	}

}

module.exports = {
	findByMovieId,
	findOneBySlug,
	create,
	addMovie
}