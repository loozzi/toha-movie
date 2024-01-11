const query = require('../../config/query')

const remove = async (user_id) => {
	try {
		await query(`delete from verifications where user_id = ${user_id}`)
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	delete: remove,
	createOTP: async (data) => {
		try {
			const { user_id, otp } = data
			await remove(user_id)
			await query(`insert into verifications set ?`, { user_id, otp, token: '' })
			return true
		} catch (err) {
			return false
		}
	},
	createToken: async (data) => {
		try {
			const { user_id, token } = data
			await remove(user_id)
			await query(`insert into verifications set ?`, { user_id, otp: 0, token })
			return true
		} catch (err) {
			return false
		}
	},
	findOne: async (user_id) => {
		return (await query(`select * from verifications where user_id = ${user_id}`))[0]
	}
}