import { Button, Flex, Form, Input, Spin, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { authActions, selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { AuthPayload } from '~/models/user'
import { useEffect } from 'react'
import { history } from '~/configs/history'
import routesConfig from '~/configs/routes.config'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const onFinish = (values: AuthPayload) => {
    const payload: AuthPayload = {
      email: values.email,
      password: values.password
    }

    notification.open({
      icon: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />,
      message: 'Đăng nhập',
      description: 'Vui lòng chờ trong giây lát',
      duration: 0.5
    })
    setTimeout(() => {
      dispatch(authActions.login(payload))
    }, 450)
  }

  const onFinishFailed = () => {
    notification.warning({
      message: 'Đăng nhập',
      description: 'Vui lòng kiểm tra lại thông tin đăng nhập'
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push(routesConfig.home)
    }
  }, [isAuthenticated])

  return (
    <Flex style={{ width: '100%', padding: 16 }} justify='center'>
      <Form
        name='login'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, flex: 1 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Username hoặc Email'
          name='email'
          rules={[{ required: true, message: 'Vui lòng nhập username hoặc email' }]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 kí tự' },
            { max: 32, message: 'Mật khẩu phải có tối đa 32 kí tự' }
          ]}
        >
          <Input.Password size='large' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Link to={'/' + routesConfig.auth.register}>Chưa có tài khoản? Đăng ký tại đây</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' size='large'>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default LoginPage
