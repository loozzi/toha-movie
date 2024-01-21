import { Fragment } from 'react'
import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export default PublicLayout
