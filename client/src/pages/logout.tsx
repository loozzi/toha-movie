import { Button, Result } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '~/app/hook'
import routesConfig from '~/configs/routes.config'
import { authActions } from '~/hooks/auth/auth.slice'

const LogoutPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authActions.logout())
  }, [])
  return (
    <Result
      status='success'
      title='Bạn đã đăng xuất tài khoản thành công'
      subTitle='Cảm ơn vì đã sử dụng dịch vụ của chúng tôi. Hi vọng được gặp lại bạn sớm.'
      extra={[
        <Button type='primary' key='console'>
          <Link to='/'>Trang chủ</Link>
        </Button>,
        <Button danger type='primary'>
          <Link to={'/' + routesConfig.auth.login}>Đăng nhập</Link>
        </Button>
      ]}
    />
  )
}

export default LogoutPage
