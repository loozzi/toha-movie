import { UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Space } from 'antd'
import { Link } from 'react-router-dom'
import { Actor } from '~/models/entity'

interface ActorsCompProps {
  actors: Actor[] | undefined
}

const ActorsComp = (payload: ActorsCompProps) => {
  const { actors } = payload
  return (
    <div>
      <Divider orientation='left'>Diễn viên</Divider>
      <Space direction='vertical' size={16}>
        <Space wrap size={16}>
          {actors?.map((actor) => (
            <div key={actor.id}>
              <Link
                to={`/dien-vien/${actor.slug}`}
                style={{
                  color: 'white',
                  fontWeight: 600
                }}
              >
                <Avatar
                  size={128}
                  icon={<UserOutlined />}
                  src={Object.keys(actor).includes('img_url') ? actor?.img_url : undefined}
                />
                <div style={{ textAlign: 'center' }}>{actor.name}</div>
              </Link>
            </div>
          ))}
        </Space>
      </Space>
    </div>
  )
}

export default ActorsComp
