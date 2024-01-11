module.exports = {
	to_form: ({ current_page, total_page, total_item, count, data }) => {
		return {
			items: data ?? [],
			pagination: {
				current_page: current_page ?? 1,
				total_page: total_page ?? 1,
				total_item: total_item ?? 0,
				count: count ?? 0
			}
		}
	},
	midderware: async (req, res, next) => {
		const { page, limit } = req.query
		let current_page = parseInt(page) || 1
		let limit_page = parseInt(limit) || 20

		current_page = Math.max(current_page, 1)
		limit_page = Math.min(limit_page, 100)

		res.pagination = {
			current_page: current_page,
			limit_page: limit_page,
		}
		next()
	}
}