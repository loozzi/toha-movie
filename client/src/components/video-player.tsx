import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
  current_time: number
  thumb_url: string
  saveHistory: (current_time: number, only_local: boolean) => void
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { url, current_time, thumb_url, saveHistory } = props

  const videoRef = useRef<any>(null)
  const [isReady, setReady] = useState<boolean>(false)

  const onProgress = () => {
    const time = Math.round(videoRef.current.getCurrentTime())
    if (time % 5 === 0) saveHistory(time, true)
  }

  const onSave = () => {
    const time = Math.round(videoRef.current.getCurrentTime())
    saveHistory(time, false)
  }

  const onReady = useCallback(() => {
    if (!isReady) {
      videoRef.current.seekTo(current_time, 'seconds')
      setReady(true)
    }
  }, [isReady])

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
      onProgress={onProgress}
      onPause={onSave}
      onSeek={onSave}
      onReady={onReady}
    />
  )
}

export default VideoPlayer
