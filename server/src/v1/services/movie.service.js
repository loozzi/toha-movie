const movieRepo = require('../repositories/movie.repository')
const categoryRepo = require('../repositories/category.repository')
const countryRepo = require('../repositories/country.repository')
const directorRepo = require('../repositories/director.repository')
const actorRepo = require('../repositories/actor.repository')
const paginationService = require('../utils/pagination.service')
const commentRepo = require('../repositories/comment.repository')
const rateRepo = require('../repositories/rate.repository')
const userRepository = require('../repositories/user.repository')


const getMovies = async ({ current_page, limit_page, category_id, country_id, year, type, status, chieurap }) => {
	const total_item = await movieRepo.count()

	const offset = (current_page - 1) * limit_page
	const data = await movieRepo.all({
		limit: limit_page,
		offset,
		category_id,
		country_id,
		year,
		type,
		status,
		chieurap
	})

	return {
		status: 200,
		message: 'Get movies successfully',
		elements: paginationService.to_form({
			current_page,
			total_item,
			data,
			limit: limit_page
		})
	}
}

const getMovieDetail = async ({ slug, user_id }) => {
	const movie = await movieRepo.findOneBySlug(slug)
	if (!movie) {
		return {
			status: 404,
			message: 'Movie not found'
		}
	}
	const categories = await categoryRepo.findByMovieId(movie.id)
	const countries = await countryRepo.findByMovieId(movie.id)
	const directors = await directorRepo.findByMovieId(movie.id)
	const actors = await actorRepo.findByMovieId(movie.id)
	let marked = null
	if (!!user_id) {
		marked = await userRepository.findOneMarkMovie({ movie_id: movie.id, user_id: user_id })
	}

	const rates = await rateRepo.findByMovieId(movie.id)
	const total_rate = rates.length
	const total_rate_score = rates.reduce((sum, rate) => sum + rate.rate, 0)
	const rate_score = total_rate > 0 ? total_rate_score / total_rate : 0

	const uniqBy = (a, key) => {
		var seen = {};
		return a.filter(function (item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		})
	}

	const data = {
		...movie,
		rate: Math.round(rate_score * 10) / 10,
		categories,
		countries,
		directors,
		actors: uniqBy(actors, JSON.stringify),
		marked: marked
	}
	return {
		status: 200,
		message: 'Get movie detail successfully',
		elements: data
	}
}

const getEpisodes = async (slug) => {
	const movie = await movieRepo.findOneBySlug(slug)
	if (!movie) {
		return {
			status: 404,
			message: 'Movie not found'
		}
	}
	const episodes = await movieRepo.findEpisodesByMovieId(movie.id)

	const severs = episodes.reduce((arr, e) => {
		const id = arr.map(a => a.server_id).indexOf(e.server_id)
		const episode = {
			file_name: e.file_name,
			file_slug: e.file_slug,
			video_url: e.video_url,
			m3u8_url: e.m3u8_url,
			modified: e.modefied
		}
		if (id == -1) {
			arr = [
				...arr,
				{
					server_id: e.server_id,
					server_name: e.server_name,
					movie_id: e.movie_id,
					episodes: [episode]
				}
			]
		} else {
			arr[id].episodes.push(episode)
		}
		return arr
	}, [])

	return {
		status: 200,
		message: 'Get episodes successfully',
		elements: {
			items: severs
		}
	}

}

const addMovie = async ({
	name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, view, chieurap, poster_url,
	categories, countries, directors, actors
}) => {
	const oldMovie = await movieRepo.findOneBySlug(slug)
	if (oldMovie) {
		return {
			status: 400,
			message: 'Slug existed'
		}
	}

	const payload = {
		name, origin_name, content, type, status, thumb_url, trailer_url,
		time, episode_current, episode_total, quality, lang, slug, year,
		chieurap, poster_url,
		showtimes, view
	}

	const statusCreate = await movieRepo.addMovie(payload)
	if (!statusCreate) {
		return {
			status: 401,
			message: 'Cannot create movie'
		}
	}
	const movie = await movieRepo.findOneBySlug(slug)
	const movie_id = movie.id
	categories.forEach(async (category_id) => {
		await categoryRepo.addMovie({ movie_id, category_id })
	})

	countries.forEach(async (country_id) => {
		await countryRepo.addMovie({ movie_id, country_id })
	})

	directors.forEach(async (director_id) => {
		await directorRepo.addMovie({ movie_id, director_id })
	})

	actors.forEach(async (actor_id) => {
		await actorRepo.addMovie({ movie_id, actor_id })
	})

	return {
		status: 200,
		message: 'Create movie successfully'
	}
}

const updateMovie = async ({ id, name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, chieurap, poster_url,
	categories, countries, directors, actors
}) => {
	const movie_id = id

	const movie = await movieRepo.findOneById(movie_id)
	if (!movie) {
		return {
			status: 404,
			message: 'Movie not found'
		}
	}

	const payload = {
		movie_id,
		name, origin_name, content, type, status, thumb_url, trailer_url,
		time, episode_current, episode_total, quality, lang, slug, year,
		chieurap, poster_url,
		showtimes
	}

	const statusUpdate = await movieRepo.updateMovie(payload)

	if (!statusUpdate) {
		return {
			status: 401,
			message: 'Cannot update movie'
		}
	}

	const oldCategories = await categoryRepo.findByMovieId(id)
	const oldCountries = await countryRepo.findByMovieId(id)
	const oldDirectors = await directorRepo.findByMovieId(id)
	const oldActors = await actorRepo.findByMovieId(id)

	oldCategories.forEach(async (category) => {
		if (!categories.includes(category.id))
			await categoryRepo.removeMovie({ movie_id: id, category_id: category.id })
	})

	oldCountries.forEach(async (country) => {
		if (!countries.includes(country.id))
			await countryRepo.removeMovie({ movie_id: id, country_id: country.id })
	})

	oldDirectors.forEach(async (director) => {
		if (!directors.includes(director.id))
			await directorRepo.removeMovie({ movie_id: id, director_id: director.id })
	})

	oldActors.forEach(async (actor) => {
		if (!actors.includes(actor.id))
			await actorRepo.removeMovie({ movie_id: id, actor_id: actor.id })
	})

	categories.forEach(async (category_id) => {
		const isExist = await categoryRepo.isMovieExist({ movie_id: id, category_id })
		if (!isExist)
			await categoryRepo.addMovie({ movie_id, category_id })
	})

	countries.forEach(async (country_id) => {
		const isExist = await countryRepo.isMovieExist({ movie_id: id, country_id })
		if (!isExist)
			await countryRepo.addMovie({ movie_id, country_id })
	})

	directors.forEach(async (director_id) => {
		const isExist = await directorRepo.isMovieExist({ movie_id: id, director_id })
		if (!isExist)
			await directorRepo.addMovie({ movie_id, director_id })
	})

	actors.forEach(async (actor_id) => {
		const isExist = await actorRepo.isMovieExist({ movie_id: id, actor_id })
		if (!isExist)
			await actorRepo.addMovie({ movie_id, actor_id })
	})

	return {
		status: 200,
		message: 'Update movie successfully'
	}
}

const deleteMovie = async (id) => {
	const movie = await movieRepo.findOneById(id)
	if (!movie) {
		return {
			status: 404,
			message: 'Movie not found'
		}
	}

	const statusDelete = await movieRepo.deleteMovie({ movie_id: id })

	if (!statusDelete) {
		return {
			status: 401,
			message: 'Cannot delete movie'
		}
	}

	return {
		status: 200,
		message: 'Delete movie successfully'
	}
}

const getComments = async ({ current_page, limit_page, slug, movie_id, user_id }) => {
	const limit = limit_page
	const offset = (current_page - 1) * limit_page

	const total_item = await commentRepo.count({ slug, movie_id, user_id })
	const data = await commentRepo.all({ limit, offset, slug, movie_id, user_id })

	return {
		status: 200,
		message: 'Get comments successfully',
		elements: paginationService.to_form({
			current_page,
			total_item,
			data,
			limit
		})
	}
}

const addComment = async ({ movie_id, user_id, content }) => {
	const isCreated = commentRepo.create({ movie_id, user_id, content })
	return {
		status: isCreated ? 200 : 401,
		message: isCreated ? 'Add comment successfully' : 'Cannot add comment'
	}
}

const updateComment = async ({ comment_id, user_id, content }) => {
	const comment = await commentRepo.findOneById(comment_id)
	if (!comment) {
		return {
			status: 404,
			message: 'Comment not found'
		}
	}

	if (comment.user_id !== user_id) {
		return {
			status: 403,
			message: 'Forbidden'
		}
	}

	const isUpdated = await commentRepo.update({ comment_id, content })

	return {
		status: isUpdated ? 200 : 401,
		message: isUpdated ? 'Update comment successfully' : 'Cannot update comment'
	}
}

const deleteComment = async ({ comment_id, user_id }) => {
	const comment = await commentRepo.findOneById(comment_id)
	if (!comment) {
		return {
			status: 404,
			message: 'Comment not found'
		}
	}

	if (comment.user_id !== user_id) {
		const roles = await roleRepo.getRoles(res.data.id)

		if (roles.some(role => role.slug === 'admin')) {
			const isDeleted = await commentRepo.delete({ comment_id })

			return {
				status: isDeleted ? 200 : 401,
				message: isDeleted ? 'Delete comment successfully' : 'Cannot delete comment'
			}
		}
		return {
			status: 403,
			message: 'Forbidden'
		}
	}

	const isDeleted = await commentRepo.delete({ comment_id })

	return {
		status: isDeleted ? 200 : 401,
		message: isDeleted ? 'Delete comment successfully' : 'Cannot delete comment'
	}
}

const rateMovie = async ({ movie_id, user_id, score }) => {
	const isRated = await rateRepo.isRated({ movie_id, user_id })
	let isCreated = false
	if (isRated) {
		isCreated = await rateRepo.update({ movie_id, user_id, score })
	}
	else {
		isCreated = await rateRepo.create({ movie_id, user_id, score })
	}

	if (!isCreated) {
		return {
			status: 401,
			message: 'Cannot rate movie'
		}
	}

	return {
		status: 200,
		message: 'Rate movie successfully'
	}
}

module.exports = {
	getMovies,
	getMovieDetail,
	getEpisodes,
	addMovie,
	updateMovie,
	deleteMovie,
	getComments,
	addComment,
	updateComment,
	deleteComment,
	rateMovie
}