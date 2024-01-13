const serverRepo = require('../repositories/server.repository')
const movieRepo = require('../repositories/movie.repository')
const episodeRepo = require('../repositories/episode.repository')

const create = async ({ movie_id, name }) => {
	const isExist = await movieRepo.findOneById(movie_id)
	if (!isExist) {
		return {
			status: 404,
			message: 'Movie not found'
		}
	}

	const statusCreate = await serverRepo.create({ movie_id, name })
	if (!statusCreate) {
		return {
			status: 500,
			message: 'Cannot create server'
		}
	}
	return {
		status: 200,
		message: 'Create server successfully'
	}
}

const update = async ({ server_id, name }) => {
	const isExist = await serverRepo.isExist(server_id)

	if (!isExist) {
		return {
			status: 404,
			message: 'Server not found'
		}
	}

	const statusUpdate = await serverRepo.update({ server_id, name })
	if (!statusUpdate) {
		return {
			status: 500,
			message: 'Cannot update server'
		}
	}

	return {
		status: 200,
		message: 'Update server successfully'
	}
}

const remove = async ({ server_id }) => {
	const isExist = await serverRepo.isExist(server_id)
	if (!isExist) {
		return {
			status: 404,
			message: 'Server not found'
		}
	}

	const statusDeleteEpisode = await episodeRepo.remove({ server_id })
	if (!statusDeleteEpisode) {
		return {
			status: 500,
			message: 'Cannot delete episode'
		}
	}

	const statusDelete = await serverRepo.remove({ server_id })
	if (!statusDelete) {
		return {
			status: 500,
			message: 'Cannot delete server'
		}
	}
	return {
		status: 200,
		message: 'Delete server successfully'
	}
}

module.exports = {
	create,
	update,
	delete: remove
}