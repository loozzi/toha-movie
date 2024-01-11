const jwt = require('jsonwebtoken')
const roleRepo = require('../repositories/role.repositoty')

const JWT_SECRET = process.env.JWT_SECRET

const isLoggingIn = async (req, res, next) => {
	try {
		const accessToken = req.header("Authorization").replace("Bearer ", "") ?? ''

		const data = jwt.verify(accessToken, JWT_SECRET)

		if (data.isRefreshToken) {
			res.json({
				status: 401,
				message: 'Invalid token'
			})
		} else {
			res.data = data
			next()
		}

	} catch (err) {
		res.json({
			status: 401,
			message: 'Unauthorized'
		})
	}
}

const isMember = async (req, res, next) => {
	const roles = await roleRepo.getRoles(res.data.id)
	if (roles.some(role => role.slug === 'member')) {
		res.data.roles = roles
		next()
	} else {
		res.json({
			status: 403,
			message: 'Forbidden'
		})
	}
}

const isAdmin = async (req, res, next) => {
	const roles = res.data.roles;
	if (roles.some(role => role.slug === 'admin')) {
		next()
	} else {
		res.json({
			status: 403,
			message: 'Forbidden'
		})
	}
}

module.exports = {
	isLoggingIn,
	isMember,
	isAdmin
}