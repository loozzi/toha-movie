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

const update = async (data) => {

}

const create = async (data) => {
	try {
		const { username, email, password } = data
		await query(`insert into users set ?`, { username, email, password })
		return true
	} catch (err) {
		return false
	}
}

const remove = async (data) => {
	try {
		const { id } = data
		await query(`update users set is_deleted = true where id = ${id}`)
		return true
	} catch (err) {
		return false
	}
}

const all = async (data) => {
	return await query(`select * from users where is_deleted = false`)
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