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

const create = async ({ movie_id, user_id, score }) => {
	try {
		if (await userRate({ movie_id, user_id }))
			await rateRepo.update({ movie_id, user_id, score })
		else await query(`insert into rates set ?`, { movie_id, user_id, rate: score })
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

const userRate = async ({ movie_id, user_id }) => {
	try {
		return (await query(`select rate from rates where movie_id = ${movie_id} and user_id = ${user_id}`))[0].rate
	} catch (err) {
		return null
	}
}

module.exports = {
	create,
	update,
	delete: remove,
	findByMovieId,
	userRate
}