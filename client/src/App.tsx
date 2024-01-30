import '~/App.css'
import { Route, Routes, useLocation } from 'react-router'
import routesConfig from '~/configs/routes.config'
import PublicLayout from '~/pages/public'
import LoginPage from '~/pages/auth/login'
import { ConfigProvider, theme } from 'antd'
import RegisterPage from './pages/auth/register'
import HomePage from './pages/home'
import MovieDetailPage from './pages/movie/detail'
import WatchMoviePage from './pages/movie/watch'
import LogoutPage from './pages/logout'

function App() {
  const location = useLocation()

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Routes location={location}>
        <Route path={routesConfig.public} element={<PublicLayout />}>
          <Route path={''} element={<HomePage />} />
          <Route path={routesConfig.auth.login} element={<LoginPage />} />
          <Route path={routesConfig.auth.register} element={<RegisterPage />} />
          <Route path={routesConfig.auth.logout} element={<LogoutPage />} />
          <Route path={routesConfig.movie.detail} element={<MovieDetailPage />} />
          <Route path={routesConfig.movie.watch} element={<WatchMoviePage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
