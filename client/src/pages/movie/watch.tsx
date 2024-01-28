import { Button, Result, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import ServerComp from '~/components/movies/server'
import VideoPlayer from '~/components/video-player'
import { movieActions, selectMovieDetail, selectMovieLoading, selectMovieServer } from '~/hooks/movie/movie.slice'
import { MovieEpisode } from '~/models/movies'

const WatchMoviePage = () => {
  const loading = useAppSelector(selectMovieLoading)
  const [currentEpisode, setCurrentEpisode] = useState<MovieEpisode>(undefined as any as MovieEpisode)
  const movieDetail = useAppSelector(selectMovieDetail)
  const servers = useAppSelector(selectMovieServer)
  const dispatch = useAppDispatch()

  const { slug } = useParams()

  useEffect(() => {
    dispatch(movieActions.fetchEpisode({ slug: slug as string }))
    if (!movieDetail) dispatch(movieActions.fetchMovie({ slug: slug as string }))
  }, [slug])

  useEffect(() => {
    if (servers) setCurrentEpisode(servers[0].episodes[0])
  }, [servers])

  const changeEpisode = (episode: MovieEpisode) => {
    setCurrentEpisode(episode)
  }

  if (servers === null || loading) {
    return (
      <div
        style={{
          padding: '16px'
        }}
      >
        <Spin />
      </div>
    )
  } else if (servers === undefined)
    return (
      <Result
        status='404'
        title='404'
        subTitle='Oh no, xin lỗi phim này không tồn tại hoặc đã bị xóa.'
        extra={
          <Button type='primary'>
            <Link to={'/'}>Back Home</Link>
          </Button>
        }
      />
    )
  else
    return (
      <div
        style={{
          width: '100%',
          maxWidth: 1500,
          margin: 'auto',
          padding: 16
        }}
      >
        {currentEpisode && currentEpisode.m3u8_url.length > 0 ? (
          <VideoPlayer thumb_url={movieDetail?.poster_url as string} current_time={300} url={currentEpisode.m3u8_url} />
        ) : currentEpisode && currentEpisode.video_url.length > 0 ? (
          <div>
            <video controls autoPlay src={currentEpisode.video_url} style={{ width: '100%', height: '100%' }} />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h1>
              {movieDetail?.status === 'trailer' ? 'Không tìm thấy file, vui lòng quay lại sau.' : 'File not found'}
            </h1>
          </div>
        )}
        <h1
          style={{
            marginTop: 16
          }}
        >
          {movieDetail?.name}
        </h1>
        <h4>
          {movieDetail?.origin_name} - {movieDetail?.year}
        </h4>
        <br />
        <div dangerouslySetInnerHTML={{ __html: movieDetail?.content }}></div>

        {servers.map((server) => (
          <ServerComp server={server} current_episode={currentEpisode} changeEpisode={changeEpisode} />
        ))}
      </div>
    )
}

export default WatchMoviePage
