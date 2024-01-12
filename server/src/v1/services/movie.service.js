const movieRepo = require('../repositories/movie.repository')
const categoryRepo = require('../repositories/category.repository')
const countryRepo = require('../repositories/country.repository')
const directorRepo = require('../repositories/director.repository')
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
	const data = {
		...movie,
		categories,
		countries,
		directors
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
		if (id == -1) {
			arr = [
				...arr,
				{
					server_id: e.server_id,
					server_name: e.server_name,
					movie_id: e.movie_id,
					episodes: [
						{
							file_name: e.file_name,
							file_slug: e.file_slug,
							video_url: e.video_url,
							m3u8_url: e.m3u8_url,
							modified: e.modefied
						}
					]
				}
			]
		} else {
			arr[id].episodes.push({
				file_name: e.file_name,
				file_slug: e.file_slug,
				video_url: e.video_url,
				m3u8_url: e.m3u8_url,
				modified: e.modefied
			})
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

module.exports = {
	getMovies,
	getMovieDetail,
	getEpisodes
}