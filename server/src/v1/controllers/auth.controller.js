const authService = require('../services/auth.service')

module.exports = {
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const resp = await authService.login({ email, password })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	register: async (req, res, next) => {
		try {
			const { username, email, password } = req.body

			const validateEmail = (email) => {
				var re = /\S+@\S+\.\S+/
				return re.test(email)
			}

			if (username.length < 6 || username.length > 32) {
				res.json({
					status: 400,
					message: 'Username must be between 6 and 32 characters'
				})
			}

			if (password.length < 6) {
				res.json({
					status: 400,
					message: 'Password must be at least 6 characters'
				})
			}

			if (!validateEmail(email)) {
				res.json({
					status: 400,
					message: 'Email is not valid'
				})
			}

			const resp = await authService.register({ username, email, password })

			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	logout: async (req, res, next) => {
		try {
			const resp = await authService.logout({ user_id: res.data.id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	refreshToken: async (req, res, next) => {
		try {
			const { refreshToken } = req.body
			const resp = await authService.refreshToken({ resfresh_token: refreshToken })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	forgotPassword: async (req, res, next) => {
		// TODO: forgot password
	},
	resetPassword: async (req, res, next) => {
		// TODO: reset password
	},
	verifyEmail: async (req, res, next) => {
		try {
			const { otp } = req.body
			const { id } = res.data
			const resp = await authService.verifyEmail({ otp, user_id: id })
			res.json(resp)
		}
		catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})

		}
	},
	sendOTP: async (req, res, next) => {
		try {
			const { id } = res.data
			const resp = await authService.sendOTP({ user_id: id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	}
}