const jwt = require('jsonwebtoken')
const query = require('../connect/query')
const tokenRepo = require('../repositories/token.repository')

const JWT_SECRET = process.env.JWT_SECRET
const time_expires = '1d'

const generate = async (user) => {
	const payload = {
		id: user.id,
		email: user.email,
		username: user.username
	}

	const accessToken = await jwt.sign({
		...user,
		password: undefined,
		isRefreshToken: false
	}, JWT_SECRET, { expiresIn: time_expires })

	const refreshToken = await jwt.sign({
		...payload,
		isRefreshToken: true
	}, JWT_SECRET, { expiresIn: '30d' })

	// await query(`delete from users_tokens where user_id = ${user.id}`)
	// await query(`insert into users_tokens (user_id, refresh_token) values (${user.id}, '${refreshToken}')`)
	// await tokenRepo.delete(user.id)
	// await tokenRepo.create(user.id, refreshToken)
	await tokenRepo.update(user.id, refreshToken)

	return Promise.resolve({ accessToken, refreshToken })
}

module.exports = {
	generate
}