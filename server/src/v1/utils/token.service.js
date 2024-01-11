const jwt = require('jsonwebtoken')
const query = require('../../config/query')
const tokenRepo = require('../repositories/token.repository')

const JWT_SECRET = process.env.JWT_SECRET
const time_expires = '1d'

const generate = async (user) => {
	const payload = {
		id: user.id,
		email: user.email,
		username: user.username,
		balance: user.balance
	}

	const accessToken = await jwt.sign({
		...user,
		password: undefined,
		isRefreshToken: false
	}, JWT_SECRET, { expiresIn: time_expires })

	const refreshToken = await jwt.sign({
		id: user.id,
		isRefreshToken: true
	}, JWT_SECRET, { expiresIn: '30d' })

	await tokenRepo.update(user.id, refreshToken)

	return Promise.resolve({ accessToken, refreshToken })
}

const verify = async (token) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		return Promise.resolve(decoded)
	} catch (err) {
		return Promise.reject(err)
	}
}

module.exports = {
	generate, verify
}