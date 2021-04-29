import {ThunkAction} from "redux-thunk"
import {AllAppTypes, BaseThunkType, InferActionsTypes} from "./redux-store"
import {authApi, securityAPI} from '../api/api'
import {FormAction, stopSubmit} from "redux-form"
import {Action} from "redux"

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const initialState = {
  userId: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USER_DATA':
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
  } as const)
}

export const getAuthUserData = (): ThunkType => async (
  dispatch) => {
  let response = await authApi.me ()
      if ( response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch (actions.setAuthUserData( id, email, login, true ))
      }
}

// @ts-ignore
export const login = ( email: string, password: string, rememberMe: boolean):ThunkType => async (
  dispatch) => {
    let response = await authApi.login (email, password, rememberMe)
        if ( response.data.resultCode === 0) {
          dispatch(getAuthUserData())
        }  else {
          if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
          }
          let mes = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
          // @ts-ignore
          dispatch(stopSubmit('login', {_error: mes}))
        }
}

//@ts-ignore
export const getCaptchaUrl = ( ) => async (dispatch) => {
  const response = await securityAPI.getCaptchurl()
  const captchaUrl = response.data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

//@ts-ignore
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authApi.logout()
        if ( response.data.resultCode === 0) {
          dispatch(actions.setAuthUserData(null, null, null, false))
        }
}

export default authReducer