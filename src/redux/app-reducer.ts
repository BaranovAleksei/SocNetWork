import { BaseThunkType, InferActionsTypes} from "./redux-store"
import {getAuthUserData} from "./auth-reducer"

const initialState = {
  initialized: false
}

export const actions = {
  initializedSuccess: () => ({type: 'SET_INITIALIZED'}as const)
}

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
}

//Thunk
export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(getAuthUserData())
    Promise.all([promise])
        .then( () => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer

//type
type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>