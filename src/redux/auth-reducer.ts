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

export const getAuthUserData = (): ThunkType => async (
  dispatch) => {
  let response = await authApi.me ()
      if ( response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch (setAuthUserData( id, email, login, true ))
      }
}

// @ts-ignore
export const login = ( email: string, password: string, rememberMe: boolean):ThunkType => async (
  dispatch) => {
    let response = await authApi.login (email, password, rememberMe)
        if ( response.data.resultCode === 0) {
          dispatch(getAuthUserData())
        } else {
          let mes = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
          // @ts-ignore
          dispatch(stopSubmit('login', {_error: mes}))
        }
}
//@ts-ignore
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authApi.logout()
        if ( response.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
        }
}

export default authReducer