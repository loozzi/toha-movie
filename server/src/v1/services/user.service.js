const bcrypt = require('bcrypt')
const userRepo = require('../repositories/user.repository')
const pagination = require('../utils/pagination.service')
const roleRepo = require('../repositories/role.repositoty')

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

const getUsers = async ({ current_page, limit_page }) => {
	const total_item = await userRepo.count()
	const total_page = Math.ceil(total_item / limit_page)

	const offset = (current_page - 1) * limit_page
	const limit = limit_page
	const users = await userRepo.all({ limit, offset })
	const data = []
	for (let user of users) {
		const roles = await roleRepo.getRoles(user.id)

		data.push({
			id: user.id,
			username: user.username,
			email: user.email,
			modified: user.modified,
			roles: roles.map(role => role.name)
		})
	}


	return {
		status: 200,
		message: 'Get users successfully',
		data: pagination.to_form({
			current_page,
			total_page,
			total_item,
			data
		})
	}
}

const lockUser = async ({ user_id }) => {
	const user = await userRepo.findOneById(user_id)

	if (!user) {
		return {
			status: 404,
			message: 'User not found'
		}
	}

	await userRepo.update(user_id, { is_deleted: true })

	return {
		status: 200,
		message: 'Lock user successfully'
	}
}

const addRole = async ({ user_id, role_id }) => {
	const roles = await roleRepo.getRoles(user_id)
	const role_name = (await roleRepo.findOne(role_id)).name
	if (roles.some(role => role.name === role_name)) {
		return {
			status: 400,
			message: 'User already has this role'
		}
	}

	await roleRepo.addUser(user_id, role_id)
	return {
		status: 200,
		message: 'Add role successfully'
	}
}

const removeRole = async ({ user_id, role_id }) => {
	const roles = await roleRepo.getRoles(user_id)
	const role_name = (await roleRepo.findOne(role_id)).name
	if (!roles.some(role => role.name === role_name)) {
		return {
			status: 400,
			message: 'User does not have this role'
		}
	}

	await roleRepo.removeUser(user_id, role_id)
	return {
		status: 200,
		message: 'Remove role successfully'
	}
}

module.exports = {
	changeEmail,
	getUsers,
	lockUser,
	addRole,
	removeRole
}