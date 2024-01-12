const axios = require('axios')
const movieRepo = require('../repositories/movie.repository')
const paginationService = require('../utils/pagination.service')


const convertToTimestamp = (dateInp) => {
	const [dateStr, timeStr] = dateInp.split("T");

	const date = new Date(Date.UTC(
		dateStr.slice(0, 4), // Year
		dateStr.slice(5, 7) - 1, // Month (0-indexed)
		dateStr.slice(8, 10), // Day
		timeStr.slice(0, 2), // Hours
		timeStr.slice(3, 5), // Minutes
		timeStr.slice(6, 8), // Seconds
		timeStr.slice(9, 12) // Milliseconds
	));

	return date.toISOString().slice(0, 19).replace("T", " ");
}

const compareDate = (date1, date2) => {
	return Date.parse(date1) > Date.parse(date2)
}


const getDetail = async (slug) => {
	const resp = await axios.get(`https://ophim1.com/phim/${slug}`).catch(err => {
		return {
			status: 404,
			message: err.response
		}
	})
	if (resp.status === 404) {
		return {
			status: 404,
			message: resp.message.data.msg,
		}
	}

	const { status, msg, movie, episodes } = resp.data

	if (!status) {
		return {
			status: 404,
			message: msg,
		}
	}

	const payloadMovie = {
		name: movie.name,
		origin_name: movie.origin_name,
		content: movie.content,
		type: movie.type,
		status: movie.status,
		thumb_url: movie.thumb_url,
		trailer_url: movie.trailer_url,
		time: movie.time,
		episode_current: movie.episode_current,
		episode_total: movie.episode_total,
		quality: movie.quality,
		lang: movie.lang,
		showtimes: movie.showtimes,
		slug: movie.slug,
		year: movie.year,
		view: 0,
		chieurap: movie.chieurap,
		poster_url: movie.poster_url,
		directors: movie.director,
		categories: movie.category,
		countries: movie.country,
		actors: movie.actor,
		created: convertToTimestamp(movie.created.time),
		modified: convertToTimestamp(movie.modified.time)
	}

	const createStatus = await movieRepo.create(payloadMovie)

	if (!createStatus) {
		return {
			status: 500,
			message: 'Internal Server Error',
			b: 'movie'
		}
	}

	const movieDb = await movieRepo.findOneBySlug(slug)
	for (let server of episodes) {
		const payloadServer = {
			server_name: server.server_name,
			server_data: server.server_data,
			movie_id: movieDb.id
		}

		const addEpisodeStatus = await movieRepo.updateEpisode(payloadServer)
		if (!addEpisodeStatus) {
			return {
				status: 500,
				message: 'Internal Server Error',
				b: 'episode'
			}
		}
	}

	return {
		status: 200,
		message: 'Success',
		elements: {
			movie: movieDb
		}
	}
}

const getAll = async ({ cur_page, start_page, end_page }) => {
	try {
		let curPage = 1;
		if (cur_page) {
			curPage = cur_page
		} else if (start_page && end_page) {
			curPage = start_page
		}
		while (true) {
			const apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${curPage}`
			const resp = (await axios.get(apiPage)).data
			if (resp.status) {
				const pagination = resp.pagination
				const movies = resp.items
				const pathImg = resp.pathImage
				console.log("Page: ", curPage)
				for (let movie of movies) {
					const slug = movie.slug
					// if (!movieDb)
					await getDetail(slug)
					console.log(movie.name)
				}

				curPage = pagination.currentPage + 1
				if (curPage > pagination.totalPage)
					break;
				if (end_page && curPage > end_page)
					break;
				if (cur_page && curPage > cur_page)
					break;
			}
		}

		return {
			status: 200,
			message: "Sucess"
		}
	} catch (err) {
		return {
			status: 500,
			message: "Internal Server Error"
		}
	}
}

const getUpdate = async () => {
	try {
		let curPage = 1;
		const movieLastModifed = await movieRepo.findLastModifed()
		const timeLastModifed = movieLastModifed.modified

		while (true) {
			const apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${curPage}`
			const resp = (await axios.get(apiPage)).data
			if (resp.status) {
				const pagination = resp.pagination
				const movies = resp.items
				const pathImg = resp.pathImage
				console.log("Page: ", curPage)
				for (let movie of movies) {
					const slug = movie.slug
					// if (!movieDb)
					await getDetail(slug)
					console.log(movie.name)
				}

				curPage = pagination.currentPage + 1
				if (curPage > pagination.totalPage)
					break;

				if (compareDate(timeLastModifed, movies[movies.length - 1].modified.time))
					break;
			}
		}

		return {
			status: 200,
			message: "Sucess"
		}
	} catch (err) {
		return {
			status: 500,
			message: "Internal Server Error",
			error: err
		}
	}
}

const getListUpdate = async () => {
	try {
		let curPage = 1;
		const movieLastModifed = await movieRepo.findLastModifed()
		const timeLastModifed = movieLastModifed.modified
		const result = []

		while (true) {
			const apiPage = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${curPage}`
			const resp = (await axios.get(apiPage)).data
			if (resp.status) {
				const pagination = resp.pagination
				const movies = resp.items
				const pathImg = resp.pathImage
				console.log("Page: ", curPage)
				for (let movie of movies) {
					const slug = movie.slug
					const movieDb = await movieRepo.findOneBySlug(slug)
					if (movieDb) {
						if (compareDate(movieDb.modified, movie.modified.time))
							result.push(movie)
					} else {
						result.push(movie)
					}
				}

				curPage = pagination.currentPage + 1
				if (curPage > pagination.totalPage)
					break;

				if (compareDate(timeLastModifed, movies[movies.length - 1].modified.time))
					break;
			}
		}

		return {
			status: 200,
			message: "Sucess",
			elements: paginationService.to_form({
				current_page: 1,
				total_item: result.length,
				data: result.map(e => ({ ...e, modified: e.modified.time, _id: undefined })),
				limit: result.length
			})
		}
	} catch (err) {
		return {
			status: 500,
			message: "Internal Server Error",
			error: err
		}
	}
}

module.exports = {
	getAll,
	getUpdate,
	getDetail,
	getListUpdate
}
