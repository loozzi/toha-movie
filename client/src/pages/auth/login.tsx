import { Button, Checkbox, Flex, Form, Input } from 'antd'
// import { useAppDispatch, useAppSelector } from '~/app/hook'
// import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { AuthPayload } from '~/models/user'

const LoginPage = () => {
  // const dispatch = useAppDispatch()
  // const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const onFinish = (values: AuthPayload) => {
    const payload: AuthPayload = {
      email: values.email,
      password: values.password
    }

    // dispatch({ type: 'login', payload })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Flex style={{ width: '100%', padding: 16 }} justify='center'>
      <Form
        name='basic'
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

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Lưu phiên đăng nhập</Checkbox>
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
