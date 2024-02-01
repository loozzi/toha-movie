const movieRepo = require('../repositories/movie.repository')
const categoryRepo = require('../repositories/category.repository')
const countryRepo = require('../repositories/country.repository')
const directorRepo = require('../repositories/director.repository')
const actorRepo = require('../repositories/actor.repository')
const paginationService = require('../utils/pagination.service')
const rateRepo = require('../repositories/rate.repository')
const userRepository = require('../repositories/user.repository')


const getMovies = async ({ current_page, limit_page, category_id, country_id, year, type, status, chieurap, keyword }) => {
	const total_item = await movieRepo.count({
		category_id,
		country_id,
		year,
		type,
		status,
		chieurap,
		keyword
	})

	const offset = (current_page - 1) * limit_page
	const data = await movieRepo.all({
		limit: limit_page,
		offset,
		category_id,
		country_id,
		year,
		type,
		status,
		chieurap,
		keyword
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
	let userRate = null
	if (!!user_id) {
		marked = await userRepository.findOneMarkMovie({ movie_id: movie.id, user_id: user_id })
		userRate = await rateRepo.userRate({ movie_id: movie.id, user_id }) ?? 0
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
		rate: {
			total: total_rate,
			score: rate_score,
			user: userRate
		},
		marked: marked,
		categories,
		countries,
		directors,
		actors: uniqBy(actors, JSON.stringify),
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

const rateMovie = async ({ movie_id, user_id, score }) => {
	const isCreated = await rateRepo.create({ movie_id, user_id, score })

	if (!isCreated) {
		return {
			status: 401,
			message: 'Cannot rate movie'
		}
	}

	let userRate = await rateRepo.userRate({ movie_id: movie_id, user_id }) ?? 0

	const rates = await rateRepo.findByMovieId(movie_id)
	const total_rate = rates.length
	const total_rate_score = rates.reduce((sum, rate) => sum + rate.rate, 0)
	const rate_score = total_rate > 0 ? total_rate_score / total_rate : 0

	return {
		status: 200,
		message: 'Rate movie successfully',
		elements: {
			total: total_rate,
			score: rate_score,
			user: userRate
		}
	}
}

const getMoviesForHome = async () => {
	// find 10 movies order by modified
	const theaters = await movieRepo.all({ chieurap: 1, limit: 10, offset: 0 })
	const series = await movieRepo.all({ type: 'series', limit: 10, offset: 0 })
	const singles = await movieRepo.all({ type: 'single', limit: 10, offset: 0 })
	const cartoons = await movieRepo.all({ type: 'hoathinh', limit: 10, offset: 0 })
	const tvshows = await movieRepo.all({ type: 'tvshows', limit: 10, offset: 0 })

	return {
		status: 200,
		message: 'Get movies for home successfully',
		elements: {
			theaters,
			series,
			singles,
			cartoons,
			tvshows
		}
	}
}

const getMoviesForSuggest = async ({ movie_id }) => {
	return {
		status: 200,
		message: 'Get movies for suggest successfully',
		elements: []
	}
}

module.exports = {
	getMovies,
	getMovieDetail,
	getEpisodes,
	addMovie,
	updateMovie,
	deleteMovie,
	rateMovie,
	getMoviesForHome,
	getMoviesForSuggest
}