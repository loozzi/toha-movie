import { Flex, Menu } from 'antd'
import {
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  FlagOutlined,
  BulbOutlined,
  FolderOutlined,
  FolderAddOutlined
} from '@ant-design/icons'
import { useEffect } from 'react'

import logo from '~/assets/imgs/logo.png'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { headerActions, selectCategories, selectCountries } from '~/hooks/header/header.slice'
import { Link } from 'react-router-dom'
import routesConfig from '~/configs/routes.config'
import { Header } from 'antd/es/layout/layout'

const HeaderComp = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const countries = useAppSelector(selectCountries)

  const SubMenuCategories = categories.map((category) => (
    <Menu.Item key={category.slug} style={{ flex: '1 0 25%' }}>
      <Link to={`/the-loai/${category.slug}`}>{category.name}</Link>
    </Menu.Item>
  ))
  const SubMenuCountries = countries.map((country) => (
    <Menu.Item key={country.slug} style={{ flex: '1 0 18%' }}>
      <Link to={`/quoc-gia/${country.slug}`}>{country.name}</Link>
    </Menu.Item>
  ))

  useEffect(() => {
    dispatch(headerActions.fetchHeader())
  }, [dispatch])

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        padding: 0
      }}
    >
      <Menu mode='horizontal' selectedKeys={[]}>
        <Menu.Item
          style={{ display: 'flex', alignItems: 'center' }}
          icon={<img src={logo} alt='Logo' style={{ height: '36px' }} />}
        >
          <Link to='/'></Link>
        </Menu.Item>
        <Menu.Item key='home' icon={<HomeOutlined />}>
          <Link to='/'>Trang Chủ</Link>
        </Menu.Item>
        <Menu.SubMenu key='category' icon={<AppstoreOutlined />} title='Thể Loại'>
          <Flex style={{ flexWrap: 'wrap', width: 600 }}>{categories.length && SubMenuCategories}</Flex>
        </Menu.SubMenu>
        <Menu.SubMenu key='country' icon={<FlagOutlined />} title='Quốc Gia'>
          <Flex key={'country:item'} style={{ flexWrap: 'wrap', width: 600 }}>
            {SubMenuCountries}
          </Flex>
        </Menu.SubMenu>
        <Menu.Item key='type:series' icon={<FolderAddOutlined />}>
          <Link to={`/${routesConfig.movie.series}`}>Phim Bộ</Link>
        </Menu.Item>
        <Menu.Item key='type:single' icon={<FolderOutlined />}>
          <Link to={`/${routesConfig.movie.single}`}>Phim Lẻ</Link>
        </Menu.Item>
        <Menu.Item key='chieurap' icon={<BulbOutlined />}>
          <Link to={`/${routesConfig.movie.theater}`}>Phim Chiếu Rạp</Link>
        </Menu.Item>
        <Menu.Item key='settings' icon={<SettingOutlined />}>
          <Link to={`/${routesConfig.setting}`}>Cài Đặt</Link>
        </Menu.Item>
        <Menu.SubMenu key='hide'>
          <Flex key={'hide:item'} style={{ flexWrap: 'wrap', width: 600 }}>
            {SubMenuCountries}
          </Flex>
        </Menu.SubMenu>
      </Menu>
    </Header>
  )
}

export default HeaderComp
