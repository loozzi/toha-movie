import { Fragment } from 'react'
import { Outlet } from 'react-router'
import HeaderComp from '~/components/header'

const PublicLayout = () => {
  return (
    <Fragment>
      <HeaderComp />
      <Outlet />
    </Fragment>
  )
}

export default PublicLayout
