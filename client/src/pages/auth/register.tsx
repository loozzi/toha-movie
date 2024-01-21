import { LoadingOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Spin, notification } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { history } from '~/configs/history'
import routesConfig from '~/configs/routes.config'
import { authActions, selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { RegisterPayload } from '~/models/user'

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const onFinish = (payload: any) => {
    if (payload.password !== payload.confirm) {
      notification.warning({
        message: 'Đăng ký',
        description: 'Mật khẩu không khớp'
      })
    } else {
      const data: RegisterPayload = {
        username: payload.username,
        email: payload.email,
        password: payload.password
      }
      notification.open({
        icon: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />,
        message: 'Đăng ký',
        description: 'Vui lòng chờ trong giây lát',
        duration: 0.5
      })
      setTimeout(() => {
        dispatch(authActions.register(data))
      }, 450)
    }
  }

  const onFinishFailed = () => {
    notification.warning({
      message: 'Đăng ký',
      description: 'Vui lòng kiểm tra lại thông tin đăng ký'
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [])

  return (
    <Flex
      justify='center'
      style={{
        width: '100%',
        padding: 16
      }}
    >
      <Form
        name='register'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, flex: 1 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            { required: true, message: 'Vui lòng nhập username' },
            { min: 6, message: 'Username phải có ít nhất 6 kí tự' },
            { max: 32, message: 'Username phải có tối đa 32 kí tự' }
          ]}
          hasFeedback
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Địa chỉ email không hợp lệ' }
          ]}
          hasFeedback
        >
          <Input size='large' />
        </Form.Item>{' '}
        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 kí tự' },
            { max: 32, message: 'Mật khẩu phải có tối đa 32 kí tự' }
          ]}
          hasFeedback
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item
          label='Xác nhận mật khẩu'
          name='confirm'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận lại mật khẩu'
            },
            ({ getFieldValue }: { getFieldValue: any }) => ({
              validator(_: any, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp'))
              }
            })
          ]}
          hasFeedback
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Link to={'/' + routesConfig.auth.login}>Đã có tài khoản? Đăng nhập tại đây</Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' size='large'>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default RegisterPage
