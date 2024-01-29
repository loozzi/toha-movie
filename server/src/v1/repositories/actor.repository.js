const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	const whereClauses = [
		`ma.is_deleted = false`,
		`a.is_deleted = false`,
		`ma.movie_id = ${movie_id}`
	]

	const textQuery =
		`select a.id, a.name, a.slug, a.img_url from actors a
		inner join movies_actors ma on ma.actor_id = a.id
		where ${whereClauses.join(' and ')};`

	return await query(textQuery)
}

const findOneBySlug = async (slug) => {
	return (await query(`select * from actors where slug = '${slug}' and is_deleted = false`))[0]
}

const create = async ({ name, slug, img_url }) => {
	try {
		await query(`insert into actors set ?`, { name, slug, img_url })
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

const removeMovie = async ({ movie_id, actor_id }) => {
	try {
		if (actor_id)
			await query(`update movies_actors set is_deleted = true where movie_id = ${movie_id} and actor_id = ${actor_id}`)
		else
			await query(`update movies_actors set is_deleted = true where movie_id = ${movie_id}`)
		return true
	} catch (err) {
		return false
	}
}

const isMovieExist = async ({ movie_id, actor_id }) => {
	return (await query(`select * from movies_actors where movie_id = ${movie_id} and actor_id = ${actor_id} and is_deleted = false`)).length > 0
}

const count = async () => {
	return (await query(`select count(*) as total from actors where is_deleted = false`))[0].total
}

const all = async ({ limit, offset }) => {
	return await query(`
		select a.id, a.name, a.slug, count(ma.movie_id) as count, a.modified from actors as a
		left join movies_actors as ma on a.id = ma.actor_id
		where a.is_deleted = false 
		group by a.id
		order by count desc
		limit ${limit} offset ${offset}
	`)
}

const update = async ({ id, name, slug, img_url }) => {
	try {
		await query(`update actors set ? where id = ${id}`, { name, slug, img_url })
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ id }) => {
	try {
		await query(`delete from movies_actors where actor_id = ${id}`)
		await query(`update actors set is_deleted = true where id = ${id}`)
		return true
	} catch (err) {
		return false
	}
}

const search = async ({ limit, offset, name, slug }) => {
	const whereClauses = [
		`a.is_deleted = false`
	]

	if (name) {
		whereClauses.push(`a.name like '%${name}%'`)
	}

	if (slug) {
		whereClauses.push(`a.slug like '%${slug}%'`)
	}

	const textQuery =
		`select a.id, a.name, a.slug, count(ma.movie_id) as count, a.modified from actors as a
		left join movies_actors as ma on a.id = ma.actor_id
		where ${whereClauses.join(' and ')}
		group by a.id
		order by count desc
		limit ${limit} offset ${offset}`

	return await query(textQuery)
}

const countSearch = async ({ name, slug }) => {
	const whereClauses = [
		`a.is_deleted = false`
	]

	if (name) {
		whereClauses.push(`a.name like '%${name}%'`)
	}

	if (slug) {
		whereClauses.push(`a.slug like '%${slug}%'`)
	}

	const textQuery =
		`select count(*) as total from actors as a
		where ${whereClauses.join(' and ')}`

	return (await query(textQuery))[0].total
}

module.exports = {
	findByMovieId,
	findOneBySlug,
	create,
	addMovie,
	removeMovie,
	isMovieExist,
	count,
	all,
	update,
	remove,
	search,
	countSearch
}