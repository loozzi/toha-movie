import { Fragment } from 'react'
import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
    <Fragment>
      <div>Public Layout</div>
      <Outlet />
    </Fragment>
  )
}

export default PublicLayout
