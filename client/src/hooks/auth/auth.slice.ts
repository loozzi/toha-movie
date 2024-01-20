import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '~/models/user'

interface AuthState {
  isAuthenticated: boolean
  logging: boolean
  user?: User
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  logging: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.logging = true
    },
    loginSuccess(state, actions: PayloadAction<User>) {
      state.logging = false
      state.isAuthenticated = true
      state.user = actions.payload
    },
    loginFailed(state) {
      state.logging = false
      state.isAuthenticated = false
    },
    logout(state) {
      state.logging = false
      state.isAuthenticated = false
      state.user = undefined
    }
  }
})

// Actions
export const authActions = authSlice.actions

// Selectors
export const selectLogging = (state: { auth: AuthState }) => state.auth.logging
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectUser = (state: { auth: AuthState }) => state.auth.user

// Reducers
const authReducer = authSlice.reducer
export default authReducer
