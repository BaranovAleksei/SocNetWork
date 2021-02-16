import {ThunkAction} from "redux-thunk";
import {AllAppTypes} from "./redux-store";
import { authApi } from '../api/api';

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
export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    authApi.me ()
    	.then( (data: any) => {
    		if ( data.resultCode === 0) {
    			let { id, login, email } = data.data
    			dispatch (setAuthUserData( id, email, login, true ))
    		}
    	})
  }
}
export const login = ( email: string, password: string, rememberMe: boolean): ThunkType => {
  return async (dispatch) => {
    authApi.login (email, password, rememberMe)
      .then( (data: any) => {
        if ( data.resultCode === 0) {
          dispatch(getAuthUserData())
        }
      })
  }
}
export const logout = (): ThunkType => {
  return async (dispatch) => {
    authApi.logout()
      .then( (data: any) => {
        if ( data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
        }
      })
  }
}

export default authReducer