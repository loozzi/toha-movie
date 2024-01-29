import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, Descriptions, Divider, Flex, Rate, Skeleton, Tag } from 'antd'
import { Fragment, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { movieActions, selectMovieDetail, selectMovieLoading } from '~/hooks/movie/movie.slice'
import ActorsComp from './actors'

const MovieDetailPage = () => {
  const { slug } = useParams()

  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectMovieLoading)
  const data = useAppSelector(selectMovieDetail)

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    const payload: { slug: string } = {
      slug: slug as string
    }
    dispatch(movieActions.fetchMovie(payload))
  }, [slug])

  useEffect(() => {
    console.log(data)
  }, [data])

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
        <Flex vertical={isMobile}>
          <Flex vertical>
            {loading ? (
              <Skeleton.Image
                active
                style={{
                  width: isTablet && !isMobile ? 200 : 300,
                  height: isTablet && !isMobile ? 300 : 450,
                  marginBottom: 16,
                  alignSelf: 'center'
                }}
              />
            ) : (
              <img
                src={data?.thumb_url}
                alt={data?.origin_name}
                style={{
                  width: isTablet && !isMobile ? 200 : 300,
                  height: isTablet && !isMobile ? 300 : 450,
                  objectFit: 'cover',
                  borderRadius: 8,
                  boxShadow: '0 0 16px 4px rgba(255, 255, 255, 0.16)',
                  marginBottom: 16,
                  alignSelf: 'center'
                }}
              />
            )}
            <Link to={'watch'}>
              <Button type='primary' danger block icon={<PlayCircleOutlined />} size='large'>
                XEM PHIM
              </Button>
            </Link>
          </Flex>
          <div
            style={{
              marginLeft: isMobile ? 0 : 32
            }}
          >
            {loading ? (
              <Skeleton active />
            ) : (
              <div>
                <h1
                  style={{
                    fontSize: isMobile ? 36 : 56
                  }}
                >
                  {data?.name}
                </h1>
                <div
                  style={{
                    fontSize: isMobile ? 24 : 36,
                    marginBottom: isTablet && !isMobile ? 84 : 32
                  }}
                >
                  {data?.origin_name} (<Link to={`/nam/${data?.year}`}>{data?.year}</Link>)
                </div>
              </div>
            )}
            <Descriptions
              style={{
                marginTop: 32,
                marginBottom: 16
              }}
              layout='horizontal'
              column={isMobile ? 1 : 2}
            >
              <Descriptions.Item label='THỜI LƯỢNG'>{data?.time}</Descriptions.Item>
              <Descriptions.Item label='ĐÁNH GIÁ'>
                <Rate disabled={!isAuthenticated} value={Math.round((data?.rate ?? 0) * 2) / 2} />
              </Descriptions.Item>
              <Descriptions.Item label='TRẠNG THÁI'>
                {data && `${data?.episode_current} / ${data?.episode_total}`}
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
            </Descriptions>
            {!loading && (
              <Fragment>
                <Divider orientation='left'>Giới thiệu</Divider>
                <div
                  style={{
                    fontSize: 18
                  }}
                  dangerouslySetInnerHTML={{ __html: data?.content as string }}
                ></div>
                <ActorsComp actors={data?.actors} />
                <Divider orientation='left'>Trailer</Divider>
                {data?.trailer_url && (
                  <iframe
                    style={{
                      width: '100%',
                      height: isTablet ? 400 : '100%',
                      maxWidth: 800,
                      maxHeight: 450
                    }}
                    src={data?.trailer_url.replace('watch?v=', 'embed/')}
                  ></iframe>
                )}
              </Fragment>
            )}
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default MovieDetailPage
