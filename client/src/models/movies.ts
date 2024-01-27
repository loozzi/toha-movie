import { Actor, Category, Country, Director } from './entity'

export interface Movie {
  id: number
  name: string
  origin_name: string
  slug: string
  type: 'series' | 'single' | 'hoathinh' | 'tvshows'
  status: 'ongoing' | 'completed' | 'trailer'
  year: number
  episode_current: string
  quality: string
  lang: string
  chieurap: 0 | 1
  view: number
  thumb_url: string
  modified: string
  category?: string
  country?: string
}

export interface MovieDetail extends Movie {
  content: string
  trailer_url: string
  time: string
  episode_total: string
  poster_url: string
  rate: number
  showtimes: string
  categories: Category[]
  countries: Country[]
  directors: Director[]
  actors: Actor[]
  marked: boolean | null
}

export interface MovieEpisode {
  file_name: string
  file_slug: string
  video_url: string
  m3u8_url: string
}

export interface MovieServer {
  server_id: number
  server_name: string
  movie_id: number
  episodes: MovieEpisode[]
}
