import '~/App.css'
import { Route, Routes, useLocation } from 'react-router'
import routesConfig from '~/configs/routes.config'
import PublicLayout from '~/pages/public'
import LoginPage from '~/pages/auth/login'
import { ConfigProvider, theme } from 'antd'

function App() {
  const location = useLocation()

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Routes location={location}>
        <Route path={routesConfig.public} element={<PublicLayout />}>
          <Route path={routesConfig.auth.login} element={<LoginPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
