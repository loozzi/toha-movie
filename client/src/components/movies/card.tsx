import { Badge, Flex, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { Movie } from '~/models/movies'

interface MovieCardProps {
  loading: boolean
  movie: Movie
  key: number
  size: {
    width: number
    height: number
    total_with: number
  }
}

const MovieCard = (payload: MovieCardProps) => {
  const { loading, movie, size } = payload

  const configBadge: { text: string; color: string } = {
    color: movie.status === 'ongoing' ? 'green' : movie.status === 'completed' ? 'blue' : 'red',
    text: movie.episode_current.length > 0 ? movie.episode_current : 'Loading...'
  }

  return (
    <Link to={`/phim/${movie.slug ? movie.slug : ''}`} key={movie.id} style={{ color: 'white', paddingLeft: 8 }}>
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
          text={movie.lang.length > 0 ? movie.lang : 'Loading...'}
          color='orange'
        >
          <Flex vertical style={{ position: 'relative' }}>
            {movie.quality.length > 0 && (
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
            )}
            {movie.chieurap === 1 && (
              <span
                style={{
                  position: 'absolute',
                  padding: '2px 8px',
                  backgroundColor: 'green',
                  borderRadius: 4,
                  top: size.width + (size.width === 200 ? 64 : 32),
                  left: size.width === 200 ? 38 : 6,
                  fontSize: 16,
                  opacity: 0.9
                }}
              >
                Phim Chiếu Rạp
              </span>
            )}
            {loading ? (
              <Skeleton.Image active style={{ width: size.width, height: size.height }} />
            ) : (
              <img
                style={{
                  objectFit: 'cover',
                  width: size.width,
                  height: size.height,
                  borderRadius: 4
                }}
                src={movie.thumb_url}
                alt={movie.name}
              />
            )}

            {movie.name.length > 0 ? (
              <>
                <h3>
                  {movie.name} ({movie.year})
                </h3>
                <span>{movie.origin_name}</span>
              </>
            ) : (
              <Skeleton.Input active size='small' style={{ marginTop: 8 }} />
            )}
          </Flex>
        </Badge.Ribbon>
      </Badge.Ribbon>
    </Link>
  )
}

export default MovieCard
