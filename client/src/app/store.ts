import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'

import rootSaga from './root.saga'
import authReducer from '~/hooks/auth/auth.slice'
import headerReducer from '~/hooks/header/header.slice'
import homeReducer from '~/hooks/home/home.slice'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  home: homeReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true
    }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
