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

const removeMovie = async ({ movie_id, country_id }) => {
	try {
		if (country_id)
			await query(`update movies_countries set is_deleted = true where movie_id = ${movie_id} and country_id = ${country_id}`)
		else
			await query(`update movies_countries set is_deleted = true where movie_id = ${movie_id}`)
		return true
	} catch (err) {
		return false
	}
}

const isMovieExist = async ({ movie_id, country_id }) => {
	return (await query(`select * from movies_countries where movie_id = ${movie_id} and country_id = ${country_id} and is_deleted = false`)).length > 0
}

module.exports = {
	findByMovieId,
	findOneBySlug,
	create,
	addMovie,
	removeMovie,
	isMovieExist
}