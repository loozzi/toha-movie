import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import './index.css'
import { history } from '~/configs/history.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
)
