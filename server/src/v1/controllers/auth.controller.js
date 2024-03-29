const authService = require('../services/auth.service')

module.exports = {
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				return res.json({
					status: 400,
					message: 'Email and password are required'
				})
			}
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

			if (!username || !email || !password) {
				return res.json({
					status: 400,
					message: 'Username, email and password are required'
				})
			}

			const validateEmail = (email) => {
				var re = /\S+@\S+\.\S+/
				return re.test(email)
			}

			if (username.length < 6 || username.length > 32) {
				return res.json({
					status: 400,
					message: 'Username must be between 6 and 32 characters'
				})
			}

			if (password.length < 6) {
				return res.json({
					status: 400,
					message: 'Password must be at least 6 characters'
				})
			}

			if (!validateEmail(email)) {
				return res.json({
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
			if (!refreshToken) {
				return res.json({
					status: 400,
					message: 'Refresh token is required'
				})
			}

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
		try {
			const { password, newPassword } = req.body
			const { id } = res.data

			if (!password || !newPassword) {
				return res.json({
					status: 400,
					message: 'Password and new password are required'
				})
			}

			if (newPassword.length < 6) {
				return res.json({
					status: 400,
					message: 'Password must be at least 6 characters'
				})
			}

			if (newPassword === password) {
				return res.json({
					status: 400,
					message: 'New password must be different from old password'
				})
			}

			const resp = await authService.resetPassword({ id, password, new_password: newPassword })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal Server Error',
				error: err
			})
		}
	},
	verifyEmail: async (req, res, next) => {
		try {
			const { otp } = req.body
			const { id } = res.data
			if (!otp) {
				return res.json({
					status: 400,
					message: 'OTP is required'
				})
			}

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