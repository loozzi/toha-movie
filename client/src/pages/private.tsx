import { Fragment } from 'react'
import { Outlet } from 'react-router'

const PrivateLayout = () => {
  return (
    <Fragment>
      <div>Private Layout</div>
      <Outlet />
    </Fragment>
  )
}

export default PrivateLayout
