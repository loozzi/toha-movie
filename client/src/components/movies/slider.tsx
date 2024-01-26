import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Carousel, Divider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Movie } from '~/models/movies'
import MovieCard from './card'

interface MovieSliderProps {
  loading: boolean
  movies: Movie[]
  title: string
}

const SIZE_OF_MOVIE_CARD = 212

const MovieSlider = (payload: MovieSliderProps) => {
  const { loading, movies, title } = payload
  const [itemPerSlide, setItemPerSlide] = useState<number>(5)
  const carouselRef = useRef<any>(null)

  const handleSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      carouselRef.current.next()
    } else {
      carouselRef.current.prev()
    }
  }

  const setWindowDimensions = () => {
    const _itemPerSlide = Math.floor((Math.min(window.innerWidth, 1600) - 24) / SIZE_OF_MOVIE_CARD)
    setItemPerSlide(_itemPerSlide)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions)
    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])

  return (
    <div
      style={{
        padding: '0 16px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
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
      <div
        style={{
          width: itemPerSlide * SIZE_OF_MOVIE_CARD,
          position: 'relative'
        }}
      >
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
        <div
          style={{
            width: '100%'
          }}
        >
          <Carousel dotPosition='top' ref={carouselRef} infinite autoplay slidesToShow={itemPerSlide}>
            {movies.map((movie) => (
              <div>
                <MovieCard key={movie.id} loading={loading} movie={movie} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default MovieSlider
