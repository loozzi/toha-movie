const query = require('../../config/query')

const getAllByServer = async ({ server_id }) => {
	return await query(`select * from episodes where server_id = ${server_id} and is_deleted = false`)
}

const create = async ({ name, slug, filename, video_url, m3u8_url, server_id }) => {
	try {
		const payload = { name, slug, filename, video_url, m3u8_url, server_id }
		await query(`insert into episodes set ?`, payload)
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	getAllByServer,
	create
}