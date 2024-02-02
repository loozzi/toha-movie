import { ClockCircleOutlined, FlagOutlined, MinusCircleOutlined, MinusOutlined } from '@ant-design/icons'
import { Divider, MenuProps, Space } from 'antd'
import { useAppSelector } from '~/app/hook'
import slug from '~/configs/slug'
import { selectCategories, selectCountries } from '~/hooks/header/header.slice'
import DropdownFilterComp from './dropdown.filter'

const FilterComp = () => {
  const categories = useAppSelector(selectCategories)
  const countries = useAppSelector(selectCountries)

  const categoryItems: MenuProps['items'] = categories?.map((e) => {
    return {
      key: e.id,
      icon: <MinusOutlined />,
      label: e.name,
      value: e.slug
    }
  })

  const countryItems: MenuProps['items'] = countries?.map((e) => {
    return {
      key: e.id,
      icon: <FlagOutlined />,
      label: e.name,
      value: e.slug
    }
  })

  const typeItems: MenuProps['items'] = [
    { key: 'phim-le', label: 'Phim lẻ', value: slug.value.type.singles, icon: <MinusCircleOutlined /> },
    { key: 'phim-bo', label: 'Phim bộ', value: slug.value.type.series, icon: <MinusCircleOutlined /> },
    { key: 'hoat-hinh', label: 'Phim hoạt hình', value: slug.value.type.cartoons, icon: <MinusCircleOutlined /> },
    { key: 'tv-show', label: 'TV Show', value: slug.value.type.tvShows, icon: <MinusCircleOutlined /> }
  ]

  const statusItems: MenuProps['items'] = [
    { key: 'dang-chieu', label: 'Đang chiếu', value: slug.value.status.running, icon: <ClockCircleOutlined /> },
    { key: 'sap-chieu', label: 'Sắp chiếu', value: slug.value.status.coming, icon: <ClockCircleOutlined /> },
    { key: 'da-chieu', label: 'Đã xong', value: slug.value.status.ended, icon: <ClockCircleOutlined /> }
  ]

  const yearItems: MenuProps['items'] = [
    { key: '2024', label: '2024', value: '2024', icon: <ClockCircleOutlined /> },
    { key: '2023', label: '2023', value: '2023', icon: <ClockCircleOutlined /> },
    { key: '2022', label: '2022', value: '2022', icon: <ClockCircleOutlined /> },
    { key: '2021', label: '2021', value: '2021', icon: <ClockCircleOutlined /> },
    { key: '2020', label: '2020', value: '2020', icon: <ClockCircleOutlined /> },
    { key: '2019', label: '2019', value: '2019', icon: <ClockCircleOutlined /> },
    { key: '2018', label: '2018', value: '2018', icon: <ClockCircleOutlined /> },
    { key: '2017', label: '2017', value: '2017', icon: <ClockCircleOutlined /> },
    { key: '2016', label: '2016', value: '2016', icon: <ClockCircleOutlined /> },
    { key: '2015', label: '2017', value: '2015', icon: <ClockCircleOutlined /> },
    { key: '2014', label: '2016', value: '2014', icon: <ClockCircleOutlined /> },
    { key: '2013', label: '2015', value: '2013', icon: <ClockCircleOutlined /> },
    { key: '2012', label: '2014', value: '2012', icon: <ClockCircleOutlined /> },
    { key: 'old', label: 'Cũ hơn', value: '2011', icon: <ClockCircleOutlined /> }
  ]

  return (
    <Space style={{ margin: '16px 0', width: '100%' }}>
      <DropdownFilterComp label='Loại phim' items={typeItems} queryKey={slug.key.type} />
      <DropdownFilterComp label='Thể loại' items={categoryItems} queryKey={slug.key.category} />
      <DropdownFilterComp label='Quốc gia' items={countryItems} queryKey={slug.key.country} />
      <DropdownFilterComp label='Tình trạng' items={statusItems} queryKey={slug.key.status} />
      <DropdownFilterComp label='Năm' items={yearItems} queryKey={slug.key.year} />
    </Space>
  )
}

export default FilterComp
