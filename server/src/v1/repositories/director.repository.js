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

const findOneById = async (id) => {
	return (await query(`select * from directors where id = ${id} and is_deleted = false`))[0]
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
		if (director_id)
			await query(`update movies_directors set is_deleted = true where movie_id = ${movie_id} and director_id = ${director_id}`)
		else
			await query(`update movies_directors set is_deleted = true where movie_id = ${movie_id}`)
		return true
	} catch (err) {
		return false
	}
}

const isMovieExist = async ({ movie_id, director_id }) => {
	return (await query(`select * from movies_directors where movie_id = ${movie_id} and director_id = ${director_id} and is_deleted = false`)).length > 0
}

const all = async ({ limit, offset }) => {
	const textQuery = `
		select d.id, d.name, d.slug, count(md.movie_id) as count, d.modified
		from directors d
		left join movies_directors md on d.id = md.director_id
		where d.is_deleted = false
		group by d.id
		limit ${limit} offset ${offset};
	`

	return await query(textQuery)
}

const count = async () => {
	return (await query(`select count(*) as count from directors where is_deleted = false`))[0].count
}

const update = async ({ id, name, slug }) => {
	try {
		await query(`update directors set ? where id = ${id}`, { name, slug })
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ id }) => {
	try {
		await query(`delete from movies_directors director_id = ${id}`)
		await query(`update directors set is_deleted = true where id = ${id}`)
		return true
	} catch (err) {
		return false
	}
}

const search = async ({ name, slug, limit, offset }) => {
	const whereClauses = [
		`d.is_deleted = false`
	]

	if (name) whereClauses.push(`d.name like '%${name}%'`)
	if (slug) whereClauses.push(`d.slug like '%${slug}%'`)


	const textQuery =
		`select d.id, d.name, d.slug, count(md.movie_id) as count, d.modified
		from directors d
		left join movies_directors md on d.id = md.director_id
		where ${whereClauses.join(' and ')}
		group by d.id
		limit ${limit} offset ${offset};`

	return await query(textQuery)
}

const countSearch = async ({ name, slug }) => {
	const whereClauses = [
		`d.is_deleted = false`
	]

	if (name) whereClauses.push(`d.name like '%${name}%'`)
	if (slug) whereClauses.push(`d.slug like '%${slug}%'`)

	const textQuery =
		`select count(*) as count
		from directors d
		where ${whereClauses.join(' and ')};`


	console.log(textQuery)
	return (await query(textQuery))[0].count
}

module.exports = {
	findByMovieId,
	findOneBySlug,
	findOneById,
	create,
	addMovie,
	removeMovie,
	isMovieExist,
	all,
	count,
	update,
	remove,
	search,
	countSearch
}