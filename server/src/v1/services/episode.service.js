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

const update = async ({ server_id, episode, old_slug }) => {
	const ep = await episodeRepo.findOne({ server_id, slug: old_slug })

	if (!ep) {
		return {
			status: 404,
			message: 'Episode not found'
		}
	}


	const statusUpdate = await episodeRepo.update({
		server_id,
		slug: old_slug,
		episode: {
			...episode,
			server_id
		}
	})

	if (!statusUpdate) {
		return {
			status: 500,
			message: 'Internal Server Error',
			error: 'Cannot update episode'
		}
	}

	return {
		status: 200,
		message: 'Update episode successfully'
	}
}

const remove = async ({ server_id, slug }) => {
	const ep = await episodeRepo.findOne({ server_id, slug })
	if (!ep) {
		return {
			status: 404,
			message: 'Episode not found'
		}
	}

	const statusRemove = await episodeRepo.remove({ server_id, slug })
	if (!statusRemove) {
		return {
			status: 500,
			message: 'Internal Server Error',
			error: 'Cannot delete episode'
		}
	}

	return {
		status: 200,
		message: 'Delete episode successfully'
	}
}

module.exports = {
	create,
	update,
	delete: remove
}