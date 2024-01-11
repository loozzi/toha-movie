const query = require('../../config/query')

module.exports = {
	create: async (user_id, refresh_token) => {
		await query(`insert into token_users (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	deleteById: async (user_id) => {
		await query(`delete from token_users where user_id = ${user_id}`)
	},
	deteteByToken: async (refresh_token) => {
		await query(`delete from token_users where refresh_token = '${refresh_token}'`)
	},
	update: async (user_id, refresh_token) => {
		await query(`delete from token_users where user_id = ${user_id}`)
		await query(`insert into token_users (user_id, refresh_token) values (${user_id}, '${refresh_token}')`)
	},
	findOneById: async (user_id) => {
		return (await query(`select * from token_users where user_id = ${user_id}`))[0]
	},
	findOneByToken: async (refresh_token) => {
		return (await query(`select * from token_users where refresh_token = '${refresh_token}'`))[0]
	}
}