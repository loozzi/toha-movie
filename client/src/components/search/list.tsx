import { Flex, Pagination, PaginationProps, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import slug from '~/configs/slug'
import { Movie } from '~/models/movies'
import { PaginationR } from '~/models/pagination'
import MovieCard from '../movies/card'

interface ListMovieCompProps {
  loading: boolean
  data: Movie[]
  pagination?: PaginationR
}

const ListMovieComp = (props: ListMovieCompProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pagination, loading, data } = props
  const [limit, setLimit] = useState<number>(pagination?.count ?? 20)
  const [page, setPage] = useState<number>(pagination?.current_page ?? 1)

  const handlePageChange: PaginationProps['onChange'] = (page: number, size: number) => {
    setPage(page)
    setLimit(size)
  }

  useEffect(() => {
    searchParams.set(slug.key.page, page.toString())
    searchParams.set(slug.key.limit, limit.toString())
    setSearchParams(searchParams)
  }, [page, limit])

  return (
    <Flex vertical align='center'>
      <Space
        direction='horizontal'
        size={[8, 16]}
        wrap
        style={{ width: '100%', maxWidth: 1600, display: 'flex', justifyContent: 'center', marginBottom: 32 }}
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
        pageSizeOptions={[20, 40, 60, 80, 100]}
        defaultPageSize={limit}
        onShowSizeChange={(current, size) => setLimit(size)}
        current={pagination?.current_page}
        onChange={handlePageChange}
      />
    </Flex>
  )
}

export default ListMovieComp
