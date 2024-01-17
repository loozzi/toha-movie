const query = require('../../config/query')

const all = async ({ user_id, limit, offset }) => {
	return await query(
		`SELECT * FROM histories 
		WHERE user_id = ${user_id} and is_deleted = FALSE
		ORDER BY modified DESC
		LIMIT ${limit} OFFSET ${offset};`
	)
}

const count = async ({ user_id }) => {
	return (await query(
		`SELECT count(*) as total FROM histories 
		WHERE user_id = ${user_id} and is_deleted = FALSE`
	))[0].total
}

const findOne = async ({ user_id, movie_id }) => {
	const histories = await query(
		`SELECT * FROM histories 
		WHERE user_id = ${user_id} and movie_id = ${movie_id} and is_deleted = FALSE`
	)
	return histories.length > 0 ? histories[0] : null
}

const update = async ({ user_id, movie_id }) => {
	await query(
		`UPDATE histories SET modified = now() 
		WHERE user_id = ${user_id} and movie_id = ${movie_id}`
	)
}

const create = async ({ user_id, movie_id }) => {
	try {
		const isCreated = await findOne({ user_id, movie_id })
		if (isCreated) {
			await update({ user_id, movie_id })
			return true
		}
		await query(
			`INSERT INTO histories (user_id, movie_id, cur_time) VALUES (${user_id}, ${movie_id}, 0)`
		)
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ user_id, movie_id }) => {
	try {
		await query(
			`UPDATE histories SET is_deleted = TRUE 
			WHERE user_id = ${user_id} and movie_id = ${movie_id}`
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
	delete: remove
}