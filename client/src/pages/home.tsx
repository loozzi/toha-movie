import { Flex } from 'antd'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import MovieSlider from '~/components/movies/slider'
import {
  homeActions,
  selectCartoons,
  selectSeries,
  selectSingles,
  selectTheaters,
  selectTvShows
} from '~/hooks/home/home.slice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const series = useAppSelector(selectSeries)
  const singles = useAppSelector(selectSingles)
  const cartoons = useAppSelector(selectCartoons)
  const tvShows = useAppSelector(selectTvShows)
  const theaters = useAppSelector(selectTheaters)

  useEffect(() => {
    dispatch(homeActions.fetchData())
  }, [dispatch])

  return (
    <Flex
      vertical
      style={{
        maxWidth: 1600,
        width: '100%',
        margin: 'auto'
      }}
    >
      <MovieSlider loading={theaters.loading} movies={theaters.data} title='Phim Chiểu Rạp Mới Cập Nhật' />
      <MovieSlider loading={series.loading} movies={series.data} title='Phim Bộ Mới Cập Nhật' />
      <MovieSlider loading={singles.loading} movies={singles.data} title='Phim Lẻ Mới Cập Nhật' />
      <MovieSlider loading={cartoons.loading} movies={cartoons.data} title='Phim Hoạt Hình Mới Cập Nhật' />
      <MovieSlider loading={tvShows.loading} movies={tvShows.data} title='Tv Show Mới Cập Nhật' />
    </Flex>
  )
}

export default HomePage
