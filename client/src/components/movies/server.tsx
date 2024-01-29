import { Button, Divider, Flex } from 'antd'
import { MovieEpisode, MovieServer } from '~/models/movies'

interface ServerCompProps {
  server: MovieServer
  current_episode: MovieEpisode
  current_server_id: number
  changeEpisode: (episode: MovieEpisode, server_id: number) => void
}

const ServerComp = (payload: ServerCompProps) => {
  const { server, changeEpisode, current_episode, current_server_id } = payload
  const { server_id, server_name, episodes } = server

  return (
    <div>
      <Divider orientation='left'>{server_name}</Divider>
      <Flex
        wrap='wrap'
        style={{
          width: '100%',
          maxWidth: 1600
        }}
      >
        {episodes
          .filter((e) => e.file_name.length > 0)
          .map((episode) => (
            <Button
              danger={
                current_episode
                  ? episode.m3u8_url === current_episode.m3u8_url && current_server_id === server_id
                  : false
              }
              size='large'
              key={episode.file_name}
              type='primary'
              onClick={() => changeEpisode(episode, server_id)}
              style={{
                marginBottom: 8,
                marginRight: 8
              }}
            >
              {episode.file_name}
            </Button>
          ))}
      </Flex>
    </div>
  )
}

export default ServerComp
