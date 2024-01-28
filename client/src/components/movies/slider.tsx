import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Carousel, Divider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Movie } from '~/models/movies'
import MovieCard from './card'
import { useMediaQuery } from 'react-responsive'

interface MovieSliderProps {
  loading: boolean
  movies: Movie[]
  title: string
}

const SIZE_OF_MOVIE_CARD = {
  width: 200,
  height: 300,
  total_with: 212
}

const MovieSlider = (payload: MovieSliderProps) => {
  const { loading, movies, title } = payload
  const [itemPerSlide, setItemPerSlide] = useState<number>(
    Math.floor((Math.min(window.innerWidth, 1600) - 24) / SIZE_OF_MOVIE_CARD.total_with)
  )
  const carouselRef = useRef<any>(null)
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  const emptyMovie: Movie = {
    id: 0,
    name: '',
    origin_name: '',
    slug: '',
    type: 'single',
    status: 'ongoing',
    year: 0,
    episode_current: '',
    quality: '',
    lang: '',
    chieurap: 0,
    category: '',
    country: '',
    view: 0,
    thumb_url: '',
    modified: ''
  }

  const handleSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      carouselRef.current.next()
    } else {
      carouselRef.current.prev()
    }
  }

  const setWindowDimensions = () => {
    const _itemPerSlide = Math.floor((Math.min(window.innerWidth, 1600) - 24) / SIZE_OF_MOVIE_CARD.total_with)
    setItemPerSlide(_itemPerSlide)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions)
    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])

  useEffect(() => {
    if (isTabletOrMobile) {
      SIZE_OF_MOVIE_CARD.total_with = 150
      SIZE_OF_MOVIE_CARD.width = 140
      SIZE_OF_MOVIE_CARD.height = 210
    } else {
      SIZE_OF_MOVIE_CARD.total_with = 212
      SIZE_OF_MOVIE_CARD.width = 200
      SIZE_OF_MOVIE_CARD.height = 300
    }
    setWindowDimensions()
  }, [isTabletOrMobile])

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
          width: itemPerSlide * SIZE_OF_MOVIE_CARD.total_with,
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
            {movies.length > 0
              ? movies.map((movie) => (
                  <div key={movie.id}>
                    <MovieCard size={SIZE_OF_MOVIE_CARD} key={movie.id} loading={loading} movie={movie} />
                  </div>
                ))
              : [...Array(10)].map((_, index) => (
                  <div key={index}>
                    <MovieCard size={SIZE_OF_MOVIE_CARD} key={index} loading={true} movie={emptyMovie} />
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default MovieSlider
