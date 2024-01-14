const categoryRepo = require('../repositories/category.repository')

const all = async () => {
	const categories = await categoryRepo.all()
	return {
		status: 200,
		message: 'Success',
		elements: {
			categories
		}
	}
}

module.exports = {
	all
}