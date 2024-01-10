const connector = require('./connect')

module.exports = async (query, params = null) => {
	return await new Promise((resolve, reject) => {
		try {
			// query = query.replace(/\s+/g, ' ').trim()
			// query = query.replace("''", "'")
			if (params) {
				connector.query(query, params, (err, result) => {
					if (err) {
						console.log(err)
						reject(err)
					} else {
						resolve(result)
					}
				})
			} else {
				connector.query(query, (err, result) => {
					if (err) {
						console.log(err)
						reject(err)
					} else {
						resolve(result)
					}
				})
			}
		} catch (err) {
			console.log(err)
			reject(err)
		}
	})
}