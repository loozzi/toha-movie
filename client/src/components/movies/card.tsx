import { Badge, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { Movie } from '~/models/movies'

interface MovieCardProps {
  loading: boolean
  movie: Movie
  key: number
}

const MovieCard = (payload: MovieCardProps) => {
  const { loading, movie, key } = payload

  const configBadge: { text: string; color: string } = {
    color: movie.status === 'ongoing' ? 'green' : movie.status === 'completed' ? 'blue' : 'red',
    text: movie.episode_current
  }

  return (
    <Link to={`/phim/${movie.slug}`} key={key} style={{ color: 'white', paddingLeft: 8 }}>
      <Badge.Ribbon
        placement='end'
        style={{
          right: 4,
          opacity: 0.9
        }}
        {...configBadge}
      >
        <Badge.Ribbon
          placement='end'
          style={{
            right: 4,
            top: 36,
            opacity: 0.9
          }}
          text={movie.lang}
          color='orange'
        >
          <Flex vertical style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                padding: '2px 8px',
                backgroundColor: 'orangered',
                borderRadius: 4,
                top: 8,
                left: 8
              }}
            >
              {movie.quality}
            </span>
            {movie.chieurap === 1 && (
              <span
                style={{
                  position: 'absolute',
                  padding: '2px 8px',
                  backgroundColor: 'green',
                  borderRadius: 4,
                  bottom: 60,
                  left: 22,
                  fontSize: 20
                }}
              >
                Phim Chiếu Rạp
              </span>
            )}
            <img
              style={{
                objectFit: 'cover',
                width: 200,
                height: 300,
                borderRadius: 4
              }}
              src={movie.thumb_url}
              alt={movie.name}
            />

            <h3>
              {movie.name} ({movie.year})
            </h3>
            <span>{movie.origin_name}</span>
          </Flex>
        </Badge.Ribbon>
      </Badge.Ribbon>
    </Link>
  )
}

export default MovieCard
