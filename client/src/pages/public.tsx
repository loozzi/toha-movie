import { Fragment } from 'react'
import { Outlet } from 'react-router'
import HeaderComp from '~/components/header'
import { useMediaQuery } from 'react-responsive'
import HeaderMobileComp from '~/components/header-mobile'

const PublicLayout = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <Fragment>
      {isTabletOrMobile ? <HeaderMobileComp /> : <HeaderComp />}
      <Outlet />
    </Fragment>
  )
}

export default PublicLayout
