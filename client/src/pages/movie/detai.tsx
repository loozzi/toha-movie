import { Descriptions, Flex, Rate, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppSelector } from '~/app/hook'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { MovieDetail } from '~/models/movies'
import api from '~/services'
import ActorsComp from './actors'

const MovieDetailPage = () => {
  const { slug } = useParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<MovieDetail>()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    setLoading(true)
    api.movie.getDetail(slug as string).then((resp) => {
      if (resp.status === 200) {
        setData(resp.elements)
      }
      setLoading(false)
    })
  }, [slug])
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundImage: `url(${data?.poster_url})`,
          height: '600px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.24,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1600,
          margin: '0 16px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 300
          }}
        />
        <Flex>
          <img
            src={data?.thumb_url}
            alt={data?.origin_name}
            style={{
              width: 300,
              height: 450,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 0 16px 4px rgba(255, 255, 255, 0.16)'
            }}
          />
          <div
            style={{
              marginLeft: 32
            }}
          >
            <h1
              style={{
                fontSize: 56
              }}
            >
              {data?.name}
            </h1>
            <div
              style={{
                fontSize: 36,
                marginBottom: 32
              }}
            >
              {data?.origin_name} (<Link to={`/nam/${data?.year}`}>{data?.year}</Link>)
            </div>
            <Descriptions
              style={{
                marginTop: 32,
                marginBottom: 16
              }}
              layout='horizontal'
              column={2}
            >
              <Descriptions.Item label='THỜI LƯỢNG'>{data?.time}</Descriptions.Item>
              <Descriptions.Item label='ĐÁNH GIÁ'>
                <Rate disabled={!isAuthenticated} value={Math.round((data?.rate ?? 0) * 2) / 2} />
              </Descriptions.Item>
              <Descriptions.Item label='QUỐC GIA'>
                {data?.countries?.map((item) => (
                  <Link key={item.id} to={`/quoc-gia/${item.slug}`} style={{ fontWeight: 600, color: 'white' }}>
                    {item.name}
                  </Link>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label='ĐẠO DIỄN'>
                {data?.directors?.map((item) => (
                  <Link
                    key={item.id}
                    to={`/dao-dien/${item.slug}`}
                    style={{ fontWeight: 600, color: 'white', marginRight: 8 }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label='THỂ LOẠI'>
                {data?.categories?.map((item) => (
                  <Link key={item.id} to={`/the-loai/${item.slug}`}>
                    <Tag
                      color='#108ee9'
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        padding: '4px 8px'
                      }}
                    >
                      {item.name}
                    </Tag>
                  </Link>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label='KHỞI CHIẾU'>{data?.showtimes}</Descriptions.Item>
            </Descriptions>

            <div
              style={{
                fontSize: 18
              }}
              dangerouslySetInnerHTML={{ __html: data?.content as string }}
            ></div>
            <ActorsComp actors={data?.actors} />
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default MovieDetailPage
