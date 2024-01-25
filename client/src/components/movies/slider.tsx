import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Carousel, Divider } from 'antd'
import { useRef, useState } from 'react'
import { Movie } from '~/models/movies'
import MovieCard from './card'

interface MovieSliderProps {
  loading: boolean
  movies: Movie[]
  title: string
}

const MovieSlider = (payload: MovieSliderProps) => {
  const { loading, movies, title } = payload
  const [itemPerSlide, setItemPerSlide] = useState<number>(5)
  const carouselRef = useRef<any>(null)

  const handleSlide = (type: string) => {
    if (type === 'prev') {
      carouselRef.current.prev()
    } else {
      carouselRef.current.next()
    }
  }

  return (
    <>
      <Divider
        orientation='left'
        plain
        style={{
          fontSize: 20,
          fontWeight: 600
        }}
      >
        {title}
      </Divider>
      <div style={{ maxWidth: itemPerSlide * 212, width: '100%', position: 'relative' }}>
        <CaretRightOutlined
          style={{
            fontSize: 40,
            position: 'absolute',
            top: '50%',
            right: 20,
            transform: 'translateY(-50%)',
            zIndex: 1,
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.8)'
          }}
          onClick={() => handleSlide('next')}
        />
        <CaretLeftOutlined
          style={{
            fontSize: 40,
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            zIndex: 1,
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.8)'
          }}
          onClick={() => handleSlide('prev')}
        />
        <Carousel dotPosition='top' ref={carouselRef} infinite autoplay slidesToShow={itemPerSlide}>
          {movies.map((movie) => (
            <div>
              <MovieCard key={movie.id} loading={loading} movie={movie} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default MovieSlider
