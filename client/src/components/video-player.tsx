import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
  current_time: number
  thumb_url: string
}

const VideoPlayer = (payload: VideoPlayerProps) => {
  const { url, current_time, thumb_url } = payload

  const videoRef = useRef<any>(null)

  useEffect(() => {
    videoRef.current.seekTo(current_time, 'seconds')
  }, [current_time])

  return (
    <ReactPlayer
      ref={videoRef}
      url={url}
      controls
      playing
      light={
        <img
          src={thumb_url}
          alt='Thumbnail'
          style={{ width: '100%', height: ' 100%', maxHeight: 800, objectFit: 'cover' }}
        />
      }
      config={{
        file: {
          forceHLS: true
        }
      }}
      width={'100%'}
      height={'100%'}
      style={{
        maxHeight: 900
      }}
    />
  )
}

export default VideoPlayer
