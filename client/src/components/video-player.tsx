import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
}

const VideoPlayer = (payload: VideoPlayerProps) => {
  const { url } = payload
  return (
    <ReactPlayer
      url={url}
      controls
      playing
      config={{
        file: {
          forceHLS: true
        }
      }}
    />
  )
}

export default VideoPlayer
