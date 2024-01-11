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
module.exports = {
	findOneById,
	findOneByUsername,
	findOneByEmail,
	create,
	delete: remove,
	all,
	count,
	update
}