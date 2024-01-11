const userRepo = require('../repositories/user.repository')
const bcrypt = require('bcrypt')

const changeEmail = async ({ user_id, email, password }) => {
	const user = await userRepo.findOneById(user_id)

	if (!user) {
		return {
			status: 404,
			message: 'User not found'
		}
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		return {
			status: 400,
			message: 'Wrong password'
		}
	}

	await userRepo.update(user_id, { email })

	return {
		status: 200,
		message: 'Change email successfully'
	}
}

const getUser = async () => { }

const deleteUser = async () => { }

const lockUser = async () => { }

const addRole = async () => { }

module.exports = {
	changeEmail,
	getUser,
	deleteUser,
	lockUser,
	addRole
}