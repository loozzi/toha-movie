const query = require('../../config/query')

const findByMovieId = async (movie_id) => {
	try {
		return await query(`select * from rates where movie_id = ${movie_id}`)
	} catch (err) {
		return []
	}
}

const update = async ({ movie_id, user_id, score }) => {
	try {
		query(`update rates set ? where movie_id = ${movie_id} and user_id = ${user_id}`, { rate: score })
		return true
	}
	catch (err) {
		return false
	}
}

const userRate = async ({ movie_id, user_id }) => {
	try {
		const value = (await query(`select rate from rates where movie_id = ${movie_id} and user_id = ${user_id}`))[0].rate
		console.log(value)
		return value
	} catch (err) {
		return null
	}
}

const create = async ({ movie_id, user_id, score }) => {
	try {
		const status = await userRate({ movie_id, user_id })
		if (status !== null)
			return await update({ movie_id, user_id, score })
		else await query(`insert into rates set ?`, { movie_id, user_id, rate: score })
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ movie_id, user_id }) => {
	try {
		query(`delete from rates where movie_id = ${movie_id} and user_id = ${user_id}`)
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	create,
	update,
	delete: remove,
	findByMovieId,
	userRate
}