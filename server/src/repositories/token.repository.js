const query = require('../connect/query')

module.exports = {
	create: async (user_id, refresh_token) => {
		await query(`insert into users_tokens (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	delete: async (user_id) => {
		await query(`delete from users_tokens where user_id = ${user_id}`)
	},
	update: async (user_id, refresh_token) => {
		await query(`delete from users_tokens where user_id = ${user_id}`)
		await query(`insert into users_tokens (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	findOne: async (user_id) => {
		return (await query(`select * from users_tokens where user_id = ${user_id}`))[0]
	}
}