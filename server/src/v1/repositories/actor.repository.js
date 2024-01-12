const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	const whereClauses = [
		`ma.is_deleted = false`,
		`a.is_deleted = false`,
		`ma.movie_id = ${movie_id}`
	]

	const textQuery =
		`select a.id, a.name, a.slug from actors a
		inner join movies_actors ma on ma.actor_id = a.id
		where ${whereClauses.join(' and ')};`

	return await query(textQuery)
}

const findOneBySlug = async (slug) => {
	return (await query(`select * from actors where slug = '${slug}' and is_deleted = false`))[0]
}

const create = async ({ name, slug }) => {
	try {
		await query(`insert into actors set ?`, { name, slug })
		return true
	} catch (err) {
		return false
	}
}

const addMovie = async ({ movie_id, actor_id }) => {
	try {
		await query(`insert into movies_actors set ?`, { movie_id, actor_id })
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