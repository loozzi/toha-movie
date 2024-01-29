import { Button, Result, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import ServerComp from '~/components/movies/server'
import VideoPlayer from '~/components/video-player'
import { movieActions, selectMovieDetail, selectMovieLoading, selectMovieServer } from '~/hooks/movie/movie.slice'
import { MovieEpisode } from '~/models/movies'

export interface HistoryLocalStorage {
  current_time: number
  server_id: number
  episode_name: string
  movie_id?: number
}

const WatchMoviePage = () => {
  const loading = useAppSelector(selectMovieLoading)
  const movieDetail = useAppSelector(selectMovieDetail)
  const servers = useAppSelector(selectMovieServer)
  const dispatch = useAppDispatch()

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const { slug } = useParams()
  const [currentEpisode, setCurrentEpisode] = useState<MovieEpisode>(undefined as any as MovieEpisode)
  const [currentServerId, setCurrentServerId] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const saveHistory = (current_time: number, only_local: boolean) => {
    const history = JSON.parse(localStorage.getItem('history') || '{}')

    history[movieDetail?.id as number] = {
      current_time: current_time,
      server_id: currentServerId,
      episode_name: currentEpisode?.file_name
    }

    localStorage.setItem('history', JSON.stringify(history))

    if (!only_local || current_time % 60 === 0) {
      dispatch(
        movieActions.saveHistory({
          movie_id: movieDetail?.id as number,
          current_time: current_time,
          server_id: currentServerId,
          episode_name: currentEpisode?.file_name
        })
      )
    }
  }

  const changeEpisode = (episode: MovieEpisode, server_id: number) => {
    setCurrentEpisode(episode)
    setCurrentServerId(server_id)
    saveHistory(0, false)
  }

  useEffect(() => {
    if (!movieDetail) dispatch(movieActions.fetchMovie({ slug: slug as string }))
    dispatch(movieActions.fetchEpisode({ slug: slug as string }))
  }, [slug])

  useEffect(() => {
    if (servers && movieDetail) {
      const history = JSON.parse(localStorage.getItem('history') || '{}')

      if (Object.keys(history).includes((movieDetail?.id as number).toString())) {
        const current: HistoryLocalStorage = history[movieDetail?.id as number]
        const server = servers.find((s) => s.server_id == current.server_id)

        if (server) {
          setCurrentEpisode(server.episodes[0])
          setCurrentServerId(server.server_id)
          setCurrentTime(current.current_time)
        } else {
          setCurrentEpisode(servers[0].episodes[0])
          setCurrentServerId(servers[0].server_id)
        }
      } else {
        setCurrentEpisode(servers[0].episodes[0])
        setCurrentServerId(servers[0].server_id)
      }
    }
  }, [servers, movieDetail])

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
        {isTabletOrMobile && <div style={{ height: 64 }} />}
        {currentEpisode && currentEpisode.m3u8_url.length > 0 ? (
          <VideoPlayer
            thumb_url={movieDetail?.poster_url as string}
            current_time={currentTime}
            url={currentEpisode.m3u8_url}
            saveHistory={saveHistory}
          />
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
          <Link style={{ color: '#fff', textDecoration: 'none' }} to={'/phim/' + slug}>
            {movieDetail?.name}
          </Link>
        </h1>
        <h4>
          <Link style={{ color: '#fff', textDecoration: 'none' }} to={'/phim/' + slug}>
            {movieDetail?.origin_name} - {movieDetail?.year}
          </Link>
        </h4>
        <br />
        <div dangerouslySetInnerHTML={{ __html: movieDetail?.content as string }}></div>

        {servers.map((server) => (
          <ServerComp
            server={server}
            current_episode={currentEpisode}
            current_server_id={currentServerId}
            changeEpisode={changeEpisode}
          />
        ))}
      </div>
    )
}

export default WatchMoviePage
