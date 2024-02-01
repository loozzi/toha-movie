import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '~/app/hook'
import { selectCategories, selectCountries } from '~/hooks/header/header.slice'
import { MovieStatus, MovieType, PaginationMovieParams } from '~/models/pagination'

const SearchPage = () => {
  const [searchData, setSearchData] = useSearchParams()

  const category = useAppSelector(selectCategories)
  const country = useAppSelector(selectCountries)

  useEffect(() => {
    const _category = searchData.get('the-loai')
    const _country = searchData.get('quoc-gia')
    const _year = searchData.get('nam')
    const _type = searchData.get('loai')
    const _status = searchData.get('trang-thai')
    const _keyword = searchData.get('tu-khoa')

    const country_id = country ? country.find((e) => e.slug === _country)?.id : undefined
    const category_id = category ? category.find((e) => e.slug === _category)?.id : undefined

    const params: PaginationMovieParams = {
      country_id: country_id,
      status: _status ? (_status as MovieStatus) : ('' as MovieStatus),
      year: _year ? parseInt(_year) : undefined,
      category_id: category_id,
      type: _type ? (_type as MovieType) : ('' as MovieType),
      keyword: _keyword ?? undefined
    }
    if (category && country) {
    }
  }, [searchData, category, country])

  return <div>SearchPage</div>
}

export default SearchPage
