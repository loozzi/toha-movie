const userService = require('../services/user.service')

module.exports = {
	changeEmail: async (req, res, next) => {
		try {
			const { id } = res.data
			const { email, newEmail, password } = req.body

			if (!email || !newEmail || !password) {
				return res.json({
					status: 400,
					message: 'Email, new email and password are required'
				})
			}

			if (email === newEmail) {
				return res.json({
					status: 400,
					message: 'New email must be different from old email'
				})
			}

			const validateEmail = (email) => {
				var re = /\S+@\S+\.\S+/
				return re.test(email)
			}

			if (!validateEmail(newEmail)) {
				return res.json({
					status: 400,
					message: 'New email is not valid'
				})
			}

			const resp = await userService.changeEmail({ user_id: id, email: newEmail, password })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	},
	getUser: async (req, res, next) => {
		try {

		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	},
	deleteUser: async (req, res, next) => {
		try {

		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	},
	lockUser: async (req, res, next) => {
		try {

		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	},
	addRole: async (req, res, next) => {
		try {

		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	}
}