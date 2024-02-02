const query = require('../../config/query')

const categoryRepo = require('./category.repository')
const directorRepo = require('./director.repository')
const countryRepo = require('./country.repository')
const actorRepo = require('./actor.repository')
const serverRepo = require('./server.repository')
const episodeRepo = require('./episode.repository')


const findOneBySlug = async (slug) => {
	const whereClauses = [
		`m.is_deleted = false`,
		`m.slug = '${slug}'`
	]

	const textQuery =
		`select 
			m.id, m.name, m.origin_name, m.slug, m.type, m.status, 
			m.year, m.content, m.thumb_url, m.trailer_url, m.time, 
			m.episode_current, m.episode_total, m.quality, 
			m.lang, m.showtimes, 
			m.view, m.chieurap, m.poster_url, m.modified
			from movies m
		where ${whereClauses.filter(e => e.length).join(' and ')}`

	return (await query(textQuery))[0]
}

const findOneById = async (id) => {
	return (await query(`select * from movies where id = ${id} and is_deleted = false`))[0]
}

const findLastModifed = async () => {
	return (await query(`select * from movies order by modified desc limit 1;`))[0]
}

const count = async ({
	category_id,
	country_id,
	year,
	type,
	status,
	chieurap,
	keyword
}) => {
	const whereClauses = [
		`m.is_deleted = false`,
		`mc.is_deleted = false`,
		`mct.is_deleted = false`,
		category_id ? `m.id in (select movie_id from movies_categories where category_id = ${category_id})` : '',
		country_id ? `m.id in (select movie_id from movies_countries where country_id = ${country_id})` : '',
		year ? `m.year = ${year}` : '',
		type ? `m.type = '${type}'` : '',
		status ? `m.status = '${status}'` : '',
		chieurap ? `m.chieurap = '${chieurap}'` : '',
		keyword ? `(m.name like '%${keyword}%' or m.origin_name like '%${keyword}%')` : ''
	]

	const textQuery = `
		select count(distinct m.id) as total from movies m
		inner join movies_categories mc on m.id = mc.movie_id
		inner join movies_countries mct on m.id = mct.movie_id
		where ${whereClauses.filter(e => e.length).join(' and ')}`


	return (await query(textQuery))[0].total
}

const all = async ({ limit, offset, category_id, country_id, year, type, status, order_by, chieurap, keyword }) => {
	const whereClauses = [
		`m.is_deleted = false`,
		`mc.is_deleted = false`,
		`mct.is_deleted = false`,
		`c.is_deleted = false`,
		`ct.is_deleted = false`,
		category_id ? `m.id in (select movie_id from movies_categories where category_id = ${category_id})` : '',
		country_id ? `m.id in (select movie_id from movies_countries where country_id = ${country_id})` : '',
		year ? `m.year = ${year}` : '',
		type ? `m.type = '${type}'` : '',
		status ? `m.status = '${status}'` : '',
		chieurap ? `m.chieurap = '${chieurap}'` : '',
		keyword ? `(m.name like '%${keyword}%' or m.origin_name like '%${keyword}%')` : ''
	]

	const textQuery =
		`select m.id, m.name, m.origin_name, m.slug, m.type, m.status, m.year, 
			m.episode_current, m.quality, m.lang, m.year, m.chieurap,
			group_concat(distinct c.name separator ', ') as category, 
			group_concat(distinct ct.name separator ', ') as country, 
			m.view, m.thumb_url, m.modified from movies m
		inner join movies_categories mc on m.id = mc.movie_id
		inner join categories c on mc.category_id = c.id
		inner join movies_countries mct on m.id = mct.movie_id
		inner join countries ct on mct.country_id = ct.id
		where ${whereClauses.filter(e => e.length).join(' and ')}
		group by m.id
		order by m.modified ${order_by ? order_by : 'desc'}
		limit ${limit} offset ${offset}`
	return await query(textQuery)
}

const findEpisodesByMovieId = async (movie_id) => {
	const whereClauses = [
		`e.is_deleted = false`,
		`s.is_deleted = false`,
		`s.movie_id = ${movie_id}`
	]

	const textQuery =
		`select 
			e.server_id, s.movie_id, s.name as server_name, 
			e.name as file_name, e.slug as file_slug, 
			e.video_url,  e.m3u8_url, e.modified 
		from episodes e
		inner join servers s on s.id = e.server_id
		where ${whereClauses.join(' and ')}; `

	return await query(textQuery)
}

const addMovie = async ({
	name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, view, chieurap, poster_url, created, modified
}) => {
	try {
		const payload = {
			name, origin_name, content, type, status, thumb_url, trailer_url,
			time, episode_current, episode_total, quality, lang,
			showtimes, slug, year, view, chieurap, poster_url, created, modified
		}

		await query(`insert into movies set ?`, payload)
		return true
	} catch (err) {
		return false
	}
}

const updateMovie = async ({ movie_id,
	name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, chieurap, poster_url
}) => {
	try {
		const payload = {
			name, origin_name, content, type, status, thumb_url, trailer_url,
			time, episode_current, episode_total, quality, lang,
			showtimes, slug, year, chieurap, poster_url
		}

		await query(`update movies set ? , modified = current_timestamp where id = ${movie_id}`, payload)
		return true
	} catch (err) {
		return false
	}
}

const create = async ({
	name, origin_name, content, type, status, thumb_url, trailer_url,
	time, episode_current, episode_total, quality, lang,
	showtimes, slug, year, view, chieurap, poster_url,
	directors, categories, countries, actors, created, modified
}) => {
	try {
		const payloadMovie = {
			name, origin_name, content, type, status, thumb_url, trailer_url,
			time, episode_current, episode_total, quality, lang,
			showtimes, slug, year, view, chieurap, poster_url, created, modified
		}
		const movieOld = await findOneBySlug(slug);
		if (!!movieOld) {
			await updateMovie({ movie_id: movieOld.id, ...payloadMovie })
		} else {
			await addMovie(payloadMovie)

			const movie = await findOneBySlug(slug)
			const movieId = movie.id

			for (let directorName of directors) {
				if (directorName.length === 0)
					continue;

				const slug = directorName.split("'").join('').toLowerCase().split(' ').join('-')
				let directorDb = await directorRepo.findOneBySlug(slug)

				if (!directorDb) {
					await directorRepo.create({
						name: directorName,
						slug,
					})
				}
				directorDb = await directorRepo.findOneBySlug(slug)
				await directorRepo.addMovie({ movie_id: movieId, director_id: directorDb.id })
			}

			for (let category of categories) {
				const { name, slug } = category
				let categoryDb = await categoryRepo.findOneBySlug(slug)
				if (!categoryDb) {
					await create({ name, slug })
				}
				categoryDb = await categoryRepo.findOneBySlug(slug)

				await categoryRepo.addMovie({ movie_id: movieId, category_id: categoryDb.id })
			}

			for (let country of countries) {
				const { name, slug } = country
				let countryDb = await countryRepo.findOneBySlug(slug)
				if (!countryDb) {
					await countryRepo.create({ name, slug })
				}
				countryDb = await countryRepo.findOneBySlug(slug)

				countryRepo.addMovie({ movie_id: movieId, country_id: countryDb.id })
			}

			for (let actorName of actors) {
				if (actorName.length === 0)
					continue;
				const slug = actorName.split("'").join('').toLowerCase().split(' ').join('-')
				let actorDb = await actorRepo.findOneBySlug(slug)
				if (!actorDb) {
					await actorRepo.create({
						name: actorName,
						slug,
					})
				}
				actorDb = await actorRepo.findOneBySlug(slug)
				await actorRepo.addMovie({ movie_id: movieId, actor_id: actorDb.id })
			}
		}

		return true;
	} catch (err) {
		return false;
	}
}

const addEpisode = async ({ server_name, server_data, movie_id }) => {
	try {
		const serverExists = await serverRepo.findOneByMovie({ movie_id, server_name })

		if (!serverExists) {
			serverRepo.create({ name: server_name, movie_id })
		}

		const server = await serverRepo.findOneByMovie({ movie_id, server_name })
		const server_id = server.id

		for (let episode of server_data) {
			const { name, slug, filename, link_embed, link_m3u8 } = episode
			const payload = {
				name, slug, filename, video_url: link_embed, m3u8_url: link_m3u8, server_id
			}
			await episodeRepo.create(payload)
		}
		return true
	} catch (err) {
		return false
	}
}

const updateEpisode = async ({ server_name, server_data, movie_id }) => {
	try {
		const serverExists = await serverRepo.findOneByMovie({ movie_id, server_name })

		if (!serverExists) {
			serverRepo.create({ name: server_name, movie_id })
		}

		const server = await serverRepo.findOneByMovie({ movie_id, server_name })
		const server_id = server.id

		const oldEpisodes = (await episodeRepo.getAllByServer({ server_id })).map(episode => episode.name)

		for (let episode of server_data) {
			const { name, slug, filename, link_embed, link_m3u8 } = episode
			if (!oldEpisodes.includes(name)) {
				const payload = {
					name, slug, filename, video_url: link_embed, m3u8_url: link_m3u8, server_id
				}
				await episodeRepo.create(payload)
			}
		}
		return true;
	} catch (err) {
		return false;
	}
}

const deleteMovie = async ({ movie_id }) => {
	try {
		await query(`update movies set is_deleted = true where id = ${movie_id}`)
		await categoryRepo.removeMovie({ movie_id })
		await countryRepo.removeMovie({ movie_id })
		await directorRepo.removeMovie({ movie_id })
		await actorRepo.removeMovie({ movie_id })
		return true
	} catch (err) {
		return false
	}
}

module.exports = {
	create,
	addEpisode,
	updateEpisode,
	findOneBySlug,
	findOneById,
	findLastModifed,
	count,
	all,
	findEpisodesByMovieId,
	addMovie,
	updateMovie,
	deleteMovie
}