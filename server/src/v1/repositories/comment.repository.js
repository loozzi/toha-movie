const query = require('../../config/query')
const movieRepo = require('./movie.repository')


const all = async ({ limit, offset, slug, movie_id, user_id }) => {
	if (movie_id) {
		return await query(
			`select * from comments 
			where movie_id = ${movie_id} and is_deleted = false
			order by created 
			desc limit ${limit} offset ${offset}`
		)
	}
	else if (slug) {
		const movie = await movieRepo.findOneBySlug(slug)
		if (!movie) {
			return []
		}
		return await query(
			`select * from comments 
			where movie_id = ${movie.id} and is_deleted = false
			order by created 
			desc limit ${limit} offset ${offset}`
		)
	}
	else if (user_id) {
		return await query(
			`select * from comments 
			where user_id = ${user_id} and is_deleted = false
			order by created 
			desc limit ${limit} offset ${offset}`
		)
	}

	return await query(
		`select * from comments 
		where is_deleted = false
		order by created 
		desc limit ${limit} offset ${offset}`
	)
}

const count = async ({ slug, movie_id }) => {
	if (movie_id) {
		return (await query(
			`select count(*) as total from comments 
			where movie_id = ${movie_id}`
		))[0].total
	}
	else if (slug) {
		const movie = await movieRepo.findOneBySlug(slug)
		if (!movie) {
			return 0
		}
		return (await query(
			`select count(*) as total from comments 
			where movie_id = ${movie.id}`
		))[0].total
	}

	return (await query(
		`select count(*) as total from comments`
	))[0].total
}

const create = async ({ movie_id, user_id, content }) => {
	try {
		await query(
			`insert into comments set ?`, { movie_id, user_id, content }
		)
		return true
	} catch (err) {
		return false
	}
}

const update = async ({ comment_id, content }) => {
	try {
		await query(
			`update comments set ? where id = ${comment_id}`, { content }
		)
		return true
	} catch (err) {
		return false
	}
}

const findOneById = async (comment_id) => {
	const comments = await query(
		`select * from comments 
		where id = ${comment_id}`
	)
	return comments[0]
}

const remove = async ({ comment_id }) => {
	try {
		await query(
			`delete from comments where id = ${comment_id}`
		)
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	all,
	count,
	create,
	update,
	delete: remove,
	findOneById
}	