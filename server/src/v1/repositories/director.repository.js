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

const findOneBySlug = async (slug) => {
	return (await query(`select * from directors where slug = '${slug}' and is_deleted = false`))[0]

}

const create = async ({ name, slug }) => {
	try {
		await query(`insert into directors set ?`, { name, slug })
		return true
	} catch (err) {
		return false
	}
}

const addMovie = async ({ movie_id, director_id }) => {
	try {
		await query(`insert into movies_directors set ?`, { movie_id, director_id })
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