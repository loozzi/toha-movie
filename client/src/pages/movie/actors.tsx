import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Carousel, Divider, Slider, Space } from 'antd'
import { Actor } from '~/models/entity'

interface ActorsCompProps {
  actors: Actor[] | undefined
}

const ActorsComp = (payload: ActorsCompProps) => {
  const { actors } = payload
  return <div>Actor</div>
}

export default ActorsComp
