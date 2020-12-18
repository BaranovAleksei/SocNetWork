export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: 'SET-CURRENT-PAGE',
    currentPage
  }
}
export const followtAC = (userId: string) => {
  return {
    type: 'FOLLOW',
    userId
  }
}
export const unfollowAC = (userId: string) => {
  return {
    type: 'UNFOLLOW',
    userId
  }
}
export const setUsersAC = ( users: Array<UserType>) => {
  return {
    type: 'SET-USERS',
    users
  }
}
export const setTotalUsersCountAC = ( totalCount: number) => {
  return {
    type: 'SET-TOTAL-USER-COUNT',
    totalCount
  }
}
export const setIsFetchingAC = ( isFetching: boolean) => {
  return {
    type: 'TOGGLE-IS-FETCHING',
    isFetching
  }
}
type PhotoType = {
  small: string
  large: string
}
export type UserType = {
  id: string
  photos: PhotoType
  followed: boolean
  name: string
  status: string
}
type UsersPageTP = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
  isFetching: boolean
}

const initialState: UsersPageTP = {
  users: [],
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true
}

type ActionTypeUsersPage = ReturnType<typeof followtAC>
                         & ReturnType<typeof unfollowAC>
                         & ReturnType<typeof setCurrentPageAC>
                         & ReturnType<typeof setTotalUsersCountAC>
                         & ReturnType<typeof setUsersAC>
                         & ReturnType<typeof setIsFetchingAC>;

const usersReducer = (state = initialState, action: ActionTypeUsersPage): UsersPageTP => {

  switch (action.type) {
    case 'SET-CURRENT-PAGE':
      return {...state, currentPage: action.currentPage}
    case 'SET-USERS':
      return {
        ...state,
        users: [...action.users]
      }
    case 'FOLLOW':
      return {
      ...state,
        users: state.users.map( u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          } return u;
        })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map( u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          } return u;
        })
      }
    case 'SET-TOTAL-USER-COUNT':
      return {
        ...state,
        totalUserCount: action.totalCount
      }
    case 'TOGGLE-IS-FETCHING':
      return{
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state;
  }
};

export default usersReducer