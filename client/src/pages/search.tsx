import { Divider, Spin } from 'antd'
import Search from 'antd/es/input/Search'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import FilterComp from '~/components/search/filter'
import ListMovieComp from '~/components/search/list'
import slug from '~/configs/slug'
import { selectCategories, selectCountries } from '~/hooks/header/header.slice'
import { homeActions, selectSearchResult } from '~/hooks/home/home.slice'
import { MovieStatus, MovieType, PaginationMovieParams } from '~/models/pagination'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState<string | undefined>(searchParams.get('tu-khoa') ?? '')

  const category = useAppSelector(selectCategories)
  const country = useAppSelector(selectCountries)
  const searchResult = useAppSelector(selectSearchResult)
  const dispatch = useAppDispatch()

  const onSearch = (value: string) => {
    console.log(value)
    setKeyword(value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const _category = searchParams.get(slug.key.category)
      const _country = searchParams.get(slug.key.country)
      const _year = searchParams.get(slug.key.year)
      const _type = searchParams.get(slug.key.type)
      const _status = searchParams.get(slug.key.status)
      const _theater = searchParams.get(slug.key.theater)
      const _page = searchParams.get(slug.key.page)
      const _limit = searchParams.get(slug.key.limit)

      const country_id = country ? country.find((e) => e.slug === _country)?.id : undefined
      const category_id = category ? category.find((e) => e.slug === _category)?.id : undefined

      const params: PaginationMovieParams = {
        country_id: country_id,
        status: _status ? (_status as MovieStatus) : ('' as MovieStatus),
        year: _year ? parseInt(_year) : undefined,
        category_id: category_id,
        type: _type ? (_type as MovieType) : ('' as MovieType),
        keyword: keyword ?? undefined,
        chieurap: _theater ? (parseInt(_theater) as 0 | 1) : undefined,
        page: _page ? parseInt(_page) : 1,
        limit: _limit ? parseInt(_limit) : 20
      }
      if (category && country) {
        dispatch(homeActions.search(params))
      }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchParams, category, country, keyword])

  return (
    <div
      style={{
        margin: 'auto',
        marginTop: 16,
        maxWidth: 1600,
        width: '100%'
      }}
    >
      <Search
        placeholder='Nhập tên phim...'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
      />
      <FilterComp />
      <Divider orientation='left'>
        {searchResult.loading ? (
          <Spin />
        ) : searchResult.data ? (
          `Tìm thấy ${searchResult.data.pagination.total_item} Kết quả`
        ) : (
          ''
        )}
      </Divider>
      {searchResult.loading && <Spin />}
      {searchResult.data != undefined && (
        <ListMovieComp
          pagination={searchResult.data.pagination}
          data={searchResult.data.items}
          loading={searchResult.loading}
        />
      )}
    </div>
  )
}

export default SearchPage
