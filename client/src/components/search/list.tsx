import { Divider, Flex, Pagination, Space } from 'antd'
import { Movie } from '~/models/movies'
import { PaginationR } from '~/models/pagination'
import MovieCard from '../movies/card'

interface ListMovieCompProps {
  loading: boolean
  data: Movie[]
  pagination?: PaginationR
}

const ListMovieComp = (props: ListMovieCompProps) => {
  const { pagination, loading, data } = props
  console.log(pagination, loading, data)

  return (
    <Flex vertical align='center'>
      <Space
        direction='horizontal'
        size={[8, 16]}
        wrap
        style={{ width: '100%', maxWidth: 1600, display: 'flex', justifyContent: 'center' }}
      >
        {data.map((e: Movie) => (
          <div key={e.id} style={{ height: 400, width: 192 }}>
            <MovieCard
              key={e.id}
              movie={e}
              size={{
                width: 180,
                height: 300,
                total_with: 196
              }}
              loading={loading}
            />
          </div>
        ))}
      </Space>
      <Pagination
        size='default'
        showQuickJumper
        responsive
        total={pagination?.total_item}
        pageSize={pagination?.count}
        current={pagination?.current_page}
      />
    </Flex>
  )
}

export default ListMovieComp
