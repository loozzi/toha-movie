const query = require('../../config/query')

const findOneByMovie = async ({ movie_id, server_name }) => {
	return (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}' and is_deleted = false;`))[0]
}

const findOneById = async (id) => {
	return (await query(`select * from servers where id = ${id} and is_deleted = false;`))[0]
}

const isExist = async (server_id) => {
	return (await findOneById(server_id)) ? true : false
}

const create = async ({ name, movie_id }) => {
	try {
		await query(`insert into servers set ?`, { name, movie_id })
		return true
	} catch (err) {
		return false
	}
}

const update = async ({ server_id, name }) => {
	try {
		await query(`update servers set name = '${name}' where id = ${server_id} and is_deleted = false;`)
		return true
	} catch (err) {
		return false
	}

}

const remove = async ({ server_id }) => {
	try {
		await query(`update servers set is_deleted = true where id = ${server_id}`)
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	findOneByMovie,
	create,
	findOneById,
	isExist,
	update,
	remove
}