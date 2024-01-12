const movieRepo = require('../repositories/movie.repository')
const categoryRepo = require('../repositories/category.repository')
const countryRepo = require('../repositories/country.repository')
const directorRepo = require('../repositories/director.repository')
const actorRepo = require('../repositories/actor.repository')
const paginationService = require('../utils/pagination.service')

const getMovies = async ({ current_page, limit_page, category_id, country_id, year, type, status }) => {
	const total_item = await movieRepo.count()

	const offset = (current_page - 1) * limit_page
	const data = await movieRepo.all({
		limit: limit_page,
		offset,
		category_id,
		country_id,
		year,
		type,
		status
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

const getMovieDetail = async (slug) => {
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
	const uniqBy = (a, key) => {
		var seen = {};
		return a.filter(function (item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		})
	}

	const data = {
		...movie,
		categories,
		countries,
		directors,
		actors: uniqBy(actors, JSON.stringify)
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

const addMovie = async ({ name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, view, chieurap, poster_url }) => {
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
	return {
		status: 200,
		message: 'Create movie successfully'
	}
}

module.exports = {
	getMovies,
	getMovieDetail,
	getEpisodes,
	addMovie
}