const query = require('../../config/query')

const findOneBySlug = async (slug) => {
	return (await query(`select * from movies where slug = '${slug}' and is_deleted = false`))[0]
}

const find = async (query) => { }

const findLastModifed = async () => {
	return (await query(`select * from movies order by modified desc limit 1;`))[0]
}


module.exports = {
	create: async (data) => {
		try {
			const {
				name, origin_name, content, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang,
				showtimes, slug, year, view, chieurap, poster_url,
				directors, categories, countries, created, modified
			} = data

			const payloadMovie = {
				name, origin_name, content, type, status, thumb_url, trailer_url,
				time, episode_current, episode_total, quality, lang,
				showtimes, slug, year, view, chieurap, poster_url, created, modified
			}
			const movieOld = await findOneBySlug(slug);
			if (!!movieOld) {
				await query(`update movies set ? , modified = current_timestamp where id = ${movieOld.id}`, payloadMovie)
			} else {
				await query('insert into movies set ?', payloadMovie)

				const movie = await findOneBySlug(slug)
				const movieId = movie.id

				for (let directorName of directors) {
					if (directorName.length === 0)
						continue;
					const slug = directorName.toLowerCase().split(' ').join('-')
					slug.replace("'", '')
					let directorDb = (await query(`select * from directors where slug = '${slug}' and is_deleted = false`))[0]

					if (!directorDb) {
						const payloadDirector = {
							name: directorName,
							slug,
						}
						await query(`insert into directors set ?`, payloadDirector)
					}
					directorDb = (await query(`select * from directors where slug = '${slug}' and is_deleted = false`))[0]
					await query(`insert into movies_directors set ?`, { movie_id: movieId, director_id: directorDb.id })
				}

				for (let category of categories) {
					const { name, slug } = category
					let categoryDb = (await query(`select * from categories where slug = '${slug}' and is_deleted = false`))[0]
					if (!categoryDb) {
						const payloadCategory = {
							name,
							slug,
						}
						await query(`insert into categories set ?`, payloadCategory)
					}
					categoryDb = (await query(`select * from categories where slug = '${slug}' and is_deleted = false`))[0]

					await query(`insert into movies_categories set ?`, { movie_id: movieId, category_id: categoryDb.id })
				}

				for (let country of countries) {
					const { name, slug } = country
					let countryDb = (await query(`select * from countries where slug = '${slug}' and is_deleted = false`))[0]
					if (!countryDb) {
						const payloadCountry = {
							name,
							slug,
						}
						await query(`insert into countries set ?`, payloadCountry)
					}
					countryDb = (await query(`select * from countries where slug = '${slug}' and is_deleted = false`))[0]

					await query(`insert into movies_countries set ?`, { movie_id: movieId, country_id: countryDb.id })
				}
			}

			return true;
		} catch (err) {
			return false;
		}
	},
	addEpisode: async (data) => {
		try {
			const { server_name, server_data, movie_id } = data

			const server_id = (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}'  and is_deleted = false;`))[0]

			if (!server_id) {
				await query(`insert into servers set ?`, { name: server_name, movie_id })
			}

			const server = (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}'  and is_deleted = false;`))[0]
			const serverId = server.id

			for (let episode of server_data) {
				const { name, slug, filename, link_embed, link_m3u8 } = episode
				const payloadEpisode = {
					name, slug, filename, video_url: link_embed, m3u8_url: link_m3u8, server_id: serverId
				}
				await query(`insert into episodes set ?`, payloadEpisode)
			}
			return true
		} catch (err) {
			return false
		}
	},
	updateEpisode: async (data) => {
		try {
			const { server_name, server_data, movie_id } = data
			const server_id = (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}' and is_deleted = false;`))[0]

			if (!server_id) {
				await query(`insert into servers set ?`, { name: server_name, movie_id })
			}

			const server = (await query(`select id from servers where movie_id = ${movie_id} and name = '${server_name}' and is_deleted = false;`))[0]
			const serverId = server.id

			const oldEpisodes = (await query(`select name from episodes where server_id = ${serverId} and is_deleted = false`)).map(episode => episode.name)

			for (let episode of server_data) {
				const { name, slug, filename, link_embed, link_m3u8 } = episode
				if (!oldEpisodes.includes(name)) {
					const payloadEpisode = {
						name, slug, filename, video_url: link_embed, m3u8_url: link_m3u8, server_id: serverId
					}
					await query(`insert into episodes set ?`, payloadEpisode)
				}
			}
			return true;
		} catch (err) {
			return false;
		}
	},
	find,
	findOneBySlug,
	findLastModifed
}