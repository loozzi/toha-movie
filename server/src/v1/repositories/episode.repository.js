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

const findOne = async ({ server_id, slug }) => {
	return (await query(`select * from episodes where server_id = ${server_id} and slug = '${slug}' and is_deleted = false`))[0]
}

const update = async ({ server_id, slug, episode }) => {
	try {
		await query(`update episodes set ? where server_id = ${server_id} and slug = '${slug}'`, episode)
		return true
	} catch (err) {
		return false
	}
}

const remove = async ({ server_id, slug }) => {
	try {
		if (!!slug) {
			await query(`update episodes set is_deleted = true where server_id = ${server_id} and slug = '${slug}'`)
		} else {
			await query(`update episodes set is_deleted = true where server_id = ${server_id}`)
		}
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	getAllByServer,
	create,
	findOne,
	update,
	remove
}