import '~/App.css'
import { Route, Routes, useLocation } from 'react-router'
import routesConfig from '~/configs/routes.config'
import PublicLayout from '~/pages/public'
import LoginPage from '~/pages/auth/login'

function App() {
  const location = useLocation()

  return (
    <div>
      <Routes location={location}>
        <Route path={routesConfig.public} element={<PublicLayout />}>
          <Route path={routesConfig.auth.login} element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
