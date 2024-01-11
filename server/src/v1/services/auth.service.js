const bcrypt = require('bcrypt')

const userRepo = require('../repositories/user.repository')
const roleRepo = require('../repositories/role.repositoty')
const tokenService = require('../utils/token.service')
const tokenRepo = require('../repositories/token.repository')
const verifyRepo = require('../repositories/verify.repository')
const emailService = require('../utils/email.service')

const getUserDb = async (email) => {
	let userDb = await userRepo.findOneByEmail(email)
	if (!userDb) {
		userDb = await userRepo.findOneByUsername(email)
	}

	return userDb
}

const login = async ({ email, password }) => {
	const userDb = await getUserDb(email)

	if (!userDb) {
		return {
			status: 404,
			message: 'User not found'
		}
	}

	const isMatch = await bcrypt.compare(password, userDb.password)
	if (!isMatch) {
		return {
			status: 401,
			message: 'Password is incorrect'
		}
	}

	const { accessToken, refreshToken } = await tokenService.generate(userDb)

	const user = {
		username: userDb.username,
		id: userDb.id,
		email: userDb.email,
		balance: userDb.balance,
	}

	return {
		status: 200,
		message: 'Login successfully',
		elements: {
			accessToken,
			refreshToken,
			user
		}
	}
}

const sendOTP = async ({ user_id }) => {
	const userDb = await userRepo.findOneById(user_id)

	const roles = await roleRepo.getRoles(user_id)

	if (roles.length != 0) {
		return {
			status: 400,
			message: 'User already verified'
		}
	}

	const oldOTP = await verifyRepo.findOne(user_id)
	if (oldOTP) {
		const modifiedOTP = new Date(oldOTP.modified)
		const now = new Date()
		const validTime = new Date(30 * 60 * 1000 + modifiedOTP.getTime())
		if (now < validTime && oldOTP.otp !== 0) {
			return {
				status: 400,
				message: 'OTP is still valid'
			}
		}
	}

	const OTP = Math.floor(100000 + Math.random() * 900000)
	await verifyRepo.createOTP({ user_id: userDb.id, otp: OTP })
	await emailService.hostSendOTP(userDb.email, OTP)
	return {
		status: 200,
		message: 'Send OTP successfully'
	}
}

const register = async ({ username, email, password }) => {
	const emailDb = await getUserDb(email)
	const usernameDb = await getUserDb(username)

	if (emailDb || usernameDb) {
		return {
			status: 400,
			message: 'User already exists'
		}
	}

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(password, salt)

	const userPayload = {
		username,
		email,
		password: hashPassword
	}

	const status = await userRepo.create(userPayload)
	if (!status) {
		return {
			status: 500,
			message: 'Internal Server Error'
		}
	}

	const user = await getUserDb(username)

	await sendOTP({ user_id: user.id })

	const { accessToken, refreshToken } = await tokenService.generate(user)
	return {
		code: 201,
		message: 'Register successfully',
		elements: {
			accessToken,
			refreshToken,
			user: {
				username: user.username,
				email: user.email,
				id: user.id,
				balance: user.balance
			}
		}
	}

}

const logout = async ({ user_id }) => {
	await tokenRepo.deleteById(user_id)
	return {
		status: 200,
		message: 'Logout successfully'

	}
}

const verifyEmail = async ({ user_id, otp }) => {
	const roles = await roleRepo.getRoles(user_id)

	if (roles.length != 0) {
		return {
			status: 400,
			message: 'User already verified'
		}
	}

	const oldOTP = await verifyRepo.findOne(user_id)
	if (!oldOTP) {
		return {
			status: 400,
			message: 'Invalid OTP'
		}
	}

	if (oldOTP.otp === 0) {
		return {
			status: 400,
			message: 'Invalid OTP'
		}
	}

	const modifiedOTP = new Date(oldOTP.modified)
	const now = new Date()
	const validTime = new Date(30 * 60 * 1000 + modifiedOTP.getTime())
	if (now > validTime) {
		return {
			status: 400,
			message: 'OTP is expired'
		}
	}

	if (oldOTP.otp !== otp) {
		return {
			status: 400,
			message: 'Invalid OTP'
		}
	}

	await verifyRepo.delete(user_id)

	await roleRepo.addUser(user_id, 'member')

	return {
		status: 200,
		message: 'Verify successfully'
	}
}

const refreshToken = async ({ resfresh_token }) => {
	const tokenDb = await tokenRepo.findOneByToken(resfresh_token)

	if (!tokenDb) {
		return {
			status: 401,
			message: 'Invalid refresh token'
		}
	}

	const tokenDetail = await tokenService.verify(resfresh_token)
	if (!tokenDetail || tokenDetail.isRefreshToken === false) {
		return {
			status: 401,
			message: 'Invalid refresh token'
		}
	}

	const userDb = await userRepo.findOneById(tokenDetail.id)

	const { accessToken, refreshToken } = await tokenService.generate(userDb)

	const user = {
		username: userDb.username,
		id: userDb.id,
		email: userDb.email,
		balance: userDb.balance,
	}

	return {
		status: 200,
		message: 'Login successfully',
		elements: {
			accessToken,
			refreshToken,
			user
		}
	}

}

const resetPassword = async ({ id, password, new_password }) => {
	const userDb = await userRepo.findOneById(id)
	const isMatch = await bcrypt.compare(password, userDb.password)
	if (!isMatch) {
		return {
			status: 401,
			message: 'Password is incorrect'
		}
	}

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(new_password, salt)

	await userRepo.update(id, { password: hashPassword })
	return {
		status: 200,
		message: 'Reset password successfully'
	}
}

module.exports = {
	login,
	register,
	sendOTP,
	verifyEmail,
	logout,
	refreshToken,
	resetPassword
}