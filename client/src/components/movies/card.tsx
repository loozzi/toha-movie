import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { Movie } from '~/models/movies'

interface MovieCardProps {
  loading: boolean
  movie: Movie
  key: number
}

const MovieCard = (payload: MovieCardProps) => {
  const { loading, movie, key } = payload
  return (
    <Link to={`/phim/${movie.slug}`} key={key}>
      <Flex vertical>
        <img
          style={{
            objectFit: 'cover',
            width: 200,
            height: 300
          }}
          src={movie.thumb_url}
          alt=''
        />

        {movie.name}
      </Flex>
    </Link>
  )
}

export default MovieCard
