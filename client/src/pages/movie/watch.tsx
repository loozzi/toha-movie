import { Button, Result } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import VideoPlayer from '~/components/video-player'
import { movieActions, selectMovieLoading, selectMovieServer } from '~/hooks/movie/movie.slice'

const WatchMoviePage = () => {
  const loading = useAppSelector(selectMovieLoading)
  const servers = useAppSelector(selectMovieServer)
  const dispatch = useAppDispatch()

  const { slug } = useParams()

  useEffect(() => {
    dispatch(movieActions.fetchEpisode({ slug: slug as string }))
  }, [slug])

  useEffect(() => {
    console.log(servers)
  }, [servers])

  if (servers === null) return <div>loading...</div>
  else if (servers === undefined)
    return (
      <Result
        status='404'
        title='404'
        subTitle='Oh no, xin lỗi nhưng phim này không tồn tại hoặc đã bị xóa.'
        extra={
          <Button type='primary'>
            <Link to={'/'}>Back Home</Link>
          </Button>
        }
      />
    )
  else
    return (
      <div>
        <VideoPlayer url={servers[0].episodes[0].m3u8_url} />
      </div>
    )
}

export default WatchMoviePage
