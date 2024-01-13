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

const findOneBySlug = async (slug) => {
	return (await query(`select * from categories where slug = '${slug}' and is_deleted = false`))[0]
}

const create = async ({ name, slug }) => {
	try {
		await query(`insert into categories set ?`, { name, slug })
		return true
	} catch (err) {
		return false
	}
}

const addMovie = async ({ movie_id, category_id }) => {
	try {
		await query(`insert into movies_categories set ?`, { movie_id, category_id })
		return true
	} catch (err) {
		return false
	}
}

const removeMovie = async ({ movie_id, category_id }) => {
	try {
		if (category_id)
			await query(`update movies_categories set is_deleted = true where movie_id = ${movie_id} and category_id = ${category_id}`)
		else
			await query(`update movies_categories set is_deleted = true where movie_id = ${movie_id}`)
		return true
	} catch (err) {
		return false
	}
}

const isMovieExist = async ({ movie_id, category_id }) => {
	return (await query(`select * from movies_categories where movie_id = ${movie_id} and category_id = ${category_id} and is_deleted = false`)).length > 0
}

module.exports = {
	findByMovieId,
	findOneBySlug,
	create,
	addMovie,
	removeMovie,
	isMovieExist
}