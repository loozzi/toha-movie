const query = require('../../config/query')

const findOneById = async (id) => {
	return (await query(`select * from users where id = ${id} and is_deleted = false`))[0]
}

const findOneByUsername = async (username) => {
	return (await query(`select * from users where username = '${username}' and is_deleted = false`))[0]
}

const findOneByEmail = async (email) => {
	return (await query(`select * from users where email = '${email}' and is_deleted = false`))[0]
}

const update = async (user_id, data) => {
	try {
		await query(`update users set ?, modified = current_timestamp where id = ${user_id}`, data)
		return true
	} catch (err) {
		return false
	}
}

const create = async ({ username, email, password }) => {
	try {
		await query(`insert into users set ?`, { username, email, password })
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ id }) => {
	try {
		await query(`update users set is_deleted = true, modified = current_timestamp where id = ${id}`)
		return true
	} catch (err) {
		return false
	}
}

const all = async ({ limit, offset }) => {
	return await query(`select * from users where is_deleted = false limit ${limit} offset ${offset}`)
}

const count = async (data) => {
	return (await query(`select count(*) as total from users where is_deleted = false`))[0].total
}

const findOneMarkMovie = async ({ user_id, movie_id }) => {
	return (await query(
		`select user_id, movie_id, type 
		from users_movies where user_id = ${user_id} 
		and movie_id = ${movie_id} and is_deleted = false`
	))[0]
}

const updateMarkMovie = async ({ user_id, movie_id, type }) => {
	await query(
		`update users_movies set ? 
		where user_id = ${user_id} and movie_id = ${movie_id} 
		and is_deleted = false`, { type }
	)
}

const markMovie = async ({ user_id, movie_id, type }) => {
	try {
		const isMarked = await findOneMarkMovie({ user_id, movie_id })
		if (!!isMarked) {
			await updateMarkMovie({ user_id, movie_id, type })
		} else {
			await query(`insert into users_movies set ?`, { user_id, movie_id, type })
		}
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	findOneById,
	findOneByUsername,
	findOneByEmail,
	create,
	delete: remove,
	all,
	count,
	update,
	markMovie,
	findOneMarkMovie
}