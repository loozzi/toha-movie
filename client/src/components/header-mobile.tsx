import {
  AppstoreOutlined,
  FlagOutlined,
  FolderAddOutlined,
  FolderOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  ShopOutlined
} from '@ant-design/icons'
import { Drawer, Flex, Menu, MenuProps } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { selectCategories, selectCountries, headerActions } from '~/hooks/header/header.slice'
import logo from '~/assets/imgs/logo.png'
import routesConfig from '~/configs/routes.config'

const HeaderMobileComp = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const countries = useAppSelector(selectCountries)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [openKeys, setOpenKeys] = useState([''])

  const onClose = () => {
    setIsShowDrawer(false)
  }

  const SubMenuCategories = categories.map((category) => (
    <Menu.Item key={category.slug} style={{ flex: '1 0 45%' }}>
      <Link to={`/the-loai/${category.slug}`}>{category.name}</Link>
    </Menu.Item>
  ))
  const SubMenuCountries = countries.map((country) => (
    <Menu.Item key={country.slug} style={{ flex: '1 0 30%' }}>
      <Link to={`/quoc-gia/${country.slug}`}>{country.name}</Link>
    </Menu.Item>
  ))

  const rootSubmenuKeys = ['category', 'country']

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onClick: MenuProps['onClick'] = (e) => {
    setOpenKeys([])
    setIsShowDrawer(false)
  }

  useEffect(() => {
    dispatch(headerActions.fetchHeader())
  }, [dispatch])
  return (
    <Header
      style={{
        padding: 0,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <MenuOutlined
        onClick={() => setIsShowDrawer(true)}
        style={{
          fontSize: '24px',
          color: '#fff',
          float: 'left',
          padding: '16px 24px'
        }}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Link
          to='/'
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img src={logo} alt='Logo' style={{ height: '56px', justifySelf: 'center' }} />
        </Link>
      </div>
      <Drawer title='TohaMovie' placement='left' onClose={onClose} closable={true} open={isShowDrawer}>
        <Menu
          mode='inline'
          selectedKeys={[]}
          openKeys={openKeys}
          onClick={onClick}
          onOpenChange={onOpenChange}
          style={{
            backgroundColor: 'transparent',
            borderRight: 'none'
          }}
        >
          <Menu.Item key='home' icon={<HomeOutlined />}>
            <Link to='/'>Trang Chủ</Link>
          </Menu.Item>
          <Menu.SubMenu key='category' icon={<AppstoreOutlined />} title='Thể Loại'>
            <Flex style={{ flexWrap: 'wrap' }}>{categories.length && SubMenuCategories}</Flex>
          </Menu.SubMenu>
          <Menu.SubMenu key='country' icon={<FlagOutlined />} title='Quốc Gia'>
            <Flex key={'country:item'} style={{ flexWrap: 'wrap' }}>
              {SubMenuCountries}
            </Flex>
          </Menu.SubMenu>
          <Menu.Item key='type:series' icon={<FolderAddOutlined />}>
            <Link to={`/${routesConfig.movie.series}`}>Phim Bộ</Link>
          </Menu.Item>
          <Menu.Item key='type:single' icon={<FolderOutlined />}>
            <Link to={`/${routesConfig.movie.single}`}>Phim Lẻ</Link>
          </Menu.Item>
          <Menu.Item key='chieurap' icon={<ShopOutlined />}>
            <Link to={`/${routesConfig.movie.theater}`}>Phim Chiếu Rạp</Link>
          </Menu.Item>
          {isAuthenticated ? (
            <Fragment>
              <Menu.Item key='settings' icon={<SettingOutlined />}>
                <Link to={`/${routesConfig.setting}`}>Cài Đặt</Link>
              </Menu.Item>
              <Menu.Item key='logout' icon={<LogoutOutlined />}>
                <Link to={`/${routesConfig.auth.logout}`}>Đăng Xuất</Link>
              </Menu.Item>
            </Fragment>
          ) : (
            <Menu.Item key='login' icon={<LoginOutlined />}>
              <Link to={`/${routesConfig.auth.login}`}>Đăng Nhập</Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </Header>
  )
}

export default HeaderMobileComp
