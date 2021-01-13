import {usersAPI} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./userspage-reducer";
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
type AuthDataPT = {
  userId: number | null
  email: string | null
  login: string | null
}
type setAuthUserDataType = {
  type: 'SET_USER_DATA'
  data: AuthDataPT
}
export const setAuthUserData = ( userId: number | null , email: string | null , login: string | null ): setAuthUserDataType => {
  return {
    type: 'SET_USER_DATA',
    data: { userId, email, login }
  }
}

type ActionTypeAuth = setAuthUserDataType

const authReducer = (state = initialState, action: ActionTypeAuth): AuthPT => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    default:
      return state;
  }
};

type ThunkType =  ThunkAction<Promise<void>, AllAppTypes, unknown, ActionTypeAuth>

export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    authApi.me ()
    	.then( (data: any) => {
    		if ( data.resultCode === 0) {
    			let { id, login, email  } = data.data
    			dispatch (setAuthUserData( id, email, login ))
    		}
    	})
  }
}

export default authReducer