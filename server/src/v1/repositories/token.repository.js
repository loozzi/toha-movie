const query = require('../../config/query')

module.exports = {
	create: async (user_id, refresh_token) => {
		await query(`insert into token_users (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	delete: async (user_id) => {
		await query(`delete from token_users where user_id = ${user_id}`)
	},
	update: async (user_id, refresh_token) => {
		await query(`delete from token_users where user_id = ${user_id}`)
		await query(`insert into token_users (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	findOne: async (user_id) => {
		return (await query(`select * from token_users where user_id = ${user_id}`))[0]
	}
}