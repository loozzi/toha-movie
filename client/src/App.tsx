import './App.css'
import { useEffect } from 'react'
import api from '~/services'

function App() {
  useEffect(() => {
    api.token.generate({ refresh_token: 'refresh_token' })
  }, [])
  return <div>Home</div>
}

export default App
