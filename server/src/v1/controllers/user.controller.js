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
	getUsers: async (req, res, next) => {
		try {
			const { current_page, limit_page } = res.pagination

			const resp = await userService.getUsers({ current_page, limit_page })
			res.json(resp)
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
			const { user_id } = req.body

			if (!user_id) {
				return res.json({
					status: 400,
					message: 'User id is required'
				})
			}

			const resp = await userService.lockUser({ user_id })
			res.json(resp)
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
			const { user_id, role_id } = req.body

			if (!user_id || !role_id) {
				return res.json({
					status: 400,
					message: 'User id and role id are required'
				})
			}

			const resp = await userService.addRole({ user_id, role_id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	},
	removeRole: async (req, res, next) => {
		try {
			const {
				user_id, role_id
			} = req.body
			if (!user_id || !role_id) {
				return res.json({
					status: 400,
					message: 'User id and role id are required'
				})
			}

			const resp = await userService.removeRole({ user_id, role_id })
			res.json(resp)
		} catch (err) {
			res.json({
				status: 500,
				message: 'Internal server error',
				error: err
			})
		}
	}
}