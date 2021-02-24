import {ThunkAction} from "redux-thunk"
import {AllAppTypes} from "./redux-store"
import {getAuthUserData} from "./auth-reducer";
// import { authApi } from '../api/api'
// import {stopSubmit} from "redux-form"

export type appRedType = {
  initialized: boolean
}
const initialState: appRedType = {
  initialized: false
}

type initializedSuccessType = {
    type: 'SET_INITIALIZED'
}
export const initializedSuccess = () => {
  return {
      type: 'SET_INITIALIZED'
  }
}

type ActionTypeApp = initializedSuccessType

const appReducer = (state = initialState, action: ActionTypeApp): appRedType => {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};

type ThunkType =  ThunkAction<Promise<void>, AllAppTypes, unknown, ActionTypeApp>

// @ts-ignore
export const initializeApp = (): ThunkType => (
  dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then( () => {
            // @ts-ignore
            dispatch(initializedSuccess())
        })

}


export default appReducer