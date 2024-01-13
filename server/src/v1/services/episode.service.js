const serverRepo = require('../repositories/server.repository')
const episodeRepo = require('../repositories/episode.repository')

const create = async ({ server_id, episode }) => {
	const server = await serverRepo.findOneById(server_id)

	if (!server) {
		return {
			status: 404,
			message: 'Server not found'
		}
	}

	const epInServers = await episodeRepo.getAllByServer({ server_id })
	if (epInServers.map(e => e.slug).includes(episode.slug)) {
		return {
			status: 400,
			message: 'Episode already exist'
		}
	}

	const statusCreate = episodeRepo.create({
		...episode,
		server_id
	})

	if (!statusCreate) {
		return {
			status: 500,
			message: 'Internal Server Error',
			error: 'Cannot create episode'
		}
	}

	return {
		status: 200,
		message: 'Create episode successfully'
	}
}

module.exports = {
	create
}