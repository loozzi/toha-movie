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
    text: movie.status === 'ongoing' ? 'Đang Cập Nhật' : movie.status === 'completed' ? 'Hoàn Thành' : 'Sắp Chiếu',
    color: movie.status === 'ongoing' ? 'green' : movie.status === 'completed' ? 'blue' : 'red'
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
        <Flex vertical>
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

          <h3>{movie.name}</h3>
          <span>{movie.origin_name}</span>
        </Flex>
      </Badge.Ribbon>
    </Link>
  )
}

export default MovieCard
