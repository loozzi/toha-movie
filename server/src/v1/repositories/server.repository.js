const query = require('../../config/query')

const findOneByMovie = async ({ movie_id, server_name }) => {
	return (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}' and is_deleted = false;`))[0]
}

const create = async ({ name, movie_id }) => {
	try {
		await query(`insert into servers set ?`, { name, movie_id })
	} catch (err) {
		return false;
	}
}

module.exports = {
	findOneByMovie,
	create
}