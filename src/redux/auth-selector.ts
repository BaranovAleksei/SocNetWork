import {AllAppTypes} from './redux-store'

export const selectIsAuth = (state: AllAppTypes) => {
  return state.Auth.isAuth
}

export const selectCurrentUserLogin = (state: AllAppTypes) => {
  return state.Auth.login
}