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

const removeMovie = async ({ movie_id, director_id }) => {
	try {
		await query(`update movies_directors set is_deleted = true where movie_id = ${movie_id} and director_id = ${director_id}`)
		return true
	} catch (err) {
		return false
	}
}

const isMovieExist = async ({ movie_id, director_id }) => {
	return (await query(`select * from movies_directors where movie_id = ${movie_id} and director_id = ${director_id} and is_deleted = false`)).length > 0
}

module.exports = {
	findByMovieId,
	findOneBySlug,
	create,
	addMovie,
	removeMovie,
	isMovieExist
}