export type AuthPT = {
  userId: string | null
  email: string | null
  login: string | null
  isAuth: boolean
  // isFetching: boolean
}

const initialState: AuthPT = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
  // isFetching: false
}

export const setAuthUserData = ( userId: string | null, email: string | null, login: string | null ) => {
  return {
    type: 'SET-USER-DATA',
    data: { userId, email, login }
  }
}

type ActionTypeAuth = ReturnType<typeof setAuthUserData>

const authReducer = (state = initialState, action: ActionTypeAuth): AuthPT => {

  switch (action.type) {
    case 'SET-USER-DATA':
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    default:
      return state;
  }
};

export default authReducer