import {ThunkAction} from "redux-thunk"
import {AllAppTypes} from "./redux-store"
import { authApi } from '../api/api'
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'socNetWork/auth/SET_USER_DATA'

export type AuthPT = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
const initialState: AuthPT = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}
// type AuthDataPT = {
//   userId: number | null
//   email: string | null
//   login: string | null
//   isAuth: boolean
// }
type setAuthUserDataType = {
  type: 'SET_USER_DATA'
  payload: AuthPT
}

type ActionTypeAuth = setAuthUserDataType

const authReducer = (state = initialState, action: ActionTypeAuth): AuthPT => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

type ThunkType =  ThunkAction<Promise<void>, AllAppTypes, unknown, ActionTypeAuth>

export const setAuthUserData = ( userId: number | null , email: string | null , login: string | null , isAuth: boolean): setAuthUserDataType => {
  return {
    type: 'SET_USER_DATA',
    payload: { userId, email, login, isAuth }
  }
}
// @ts-ignore
// export const getAuthUserData = (): ThunkType => (
//   dispatch) => {
//     authApi.me ()
//     	.then( (data: any) => {
//     		if ( data.resultCode === 0) {
//     			let { id, login, email } = data.data
//     			dispatch (setAuthUserData( id, email, login, true ))
//     		}
//     	})
// }
export const getAuthUserData = (): ThunkType => async (
  dispatch) => {
  let res = await authApi.me ()
      if ( res.data.resultCode === 0) {
        let { id, login, email } = res.data.data
        dispatch (setAuthUserData( id, email, login, true ))
      }
}

// @ts-ignore
export const login = ( email: string, password: string, rememberMe: boolean):ThunkType => async (
  dispatch) => {
    let res = await authApi.login (email, password, rememberMe)
        if ( res.data.resultCode === 0) {
          dispatch(getAuthUserData())
        } else {
          let mes = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
          // @ts-ignore
          dispatch(stopSubmit('login', {_error: mes}))
        }
}
//@ts-ignore
export const logout = ():ThunkType => async (dispatch) => {
    let res = await authApi.logout()
        if ( res.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
        }
}

export default authReducer