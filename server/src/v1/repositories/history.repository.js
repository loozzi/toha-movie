const query = require('../../config/query')

const all = async ({ user_id, limit, offset }) => {
	return await query(
		`SELECT movie_id, cur_time, episode_name, server_id, modified
		FROM histories 
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
		WHERE user_id = ${user_id} and movie_id = ${movie_id}`
	)
	return histories.length > 0 ? histories[0] : null
}

const update = async ({ user_id, movie_id, server_id, cur_time, episode_name }) => {
	await query(
		`UPDATE histories SET modified = now(), 
			cur_time = ${cur_time}, 
			episode_name = '${episode_name}', 
			server_id = ${server_id},
			is_deleted = FALSE
		WHERE user_id = ${user_id} and movie_id = ${movie_id}`
	)
}

const create = async ({ user_id, movie_id, server_id, episode_name }) => {
	try {
		const isCreated = await findOne({ user_id, movie_id })
		if (isCreated) {
			await update({ user_id, movie_id })
			return true
		}
		await query(
			`INSERT INTO histories (user_id, movie_id, cur_time, server_id, episode_name) 
			VALUES (${user_id}, ${movie_id}, 0, ${server_id}, '${episode_name}', ${episode_name})`
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