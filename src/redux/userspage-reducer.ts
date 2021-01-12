import { usersAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';
import { AllAppTypes } from "./redux-store";

type PhotoType = {
  small: string
  large: string
}
export type UserType = {
  id: number
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
  followingInProgress: Array<number>
}

const initialState: UsersPageTP = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>
}

type setCurrentPageType = {
  type: 'SET_CURRENT_PAGE'
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
  return {
    type: 'SET_CURRENT_PAGE',
    currentPage
  }
}

type followType = {
  type: 'FOLLOW'
  userId: number
}
export const followSuccess = (userId: number): followType => {
  return {
    type: 'FOLLOW',
    userId
  }
}

type unfollowType = {
  type: 'UNFOLLOW'
  userId: number
}
export const unfollowSuccess = (userId: number): unfollowType => {
  return {
    type: 'UNFOLLOW',
    userId
  }
}

type setUsersType = {
  type: 'SET_USERS'
  users: Array<UserType>
}
export const setUsers = ( users: Array<UserType>): setUsersType => {
  return {
    type: 'SET_USERS',
    users
  }
}

type setTotalUsersCountType = {
  type: 'SET_TOTAL_USER_COUNT',
  totalCount: number
}
export const setTotalUsersCount = ( totalCount: number): setTotalUsersCountType => {
  return {
    type: 'SET_TOTAL_USER_COUNT',
    totalCount
  }
}

type setIsFetchingType = {
  type: 'TOGGLE_IS_FETCHING'
  isFetching: boolean
}
export const setIsFetching = ( isFetching: boolean): setIsFetchingType => {
  return {
    type: 'TOGGLE_IS_FETCHING',
    isFetching
  }
}

type toggleFollowingProgressType = {
  type: 'FOLLOWING_IN_PROGRESS'
  followingInProgress: boolean
  id: number
}
export const toggleFollowingProgress = ( followingInProgress: boolean, id: number): toggleFollowingProgressType => {
  return {
    type: 'FOLLOWING_IN_PROGRESS',
    followingInProgress,
    id
  }
}

type ActionType = followType | unfollowType | setCurrentPageType |setTotalUsersCountType
                | setUsersType | setIsFetchingType | toggleFollowingProgressType

const usersReducer = (state = initialState, action: ActionType): UsersPageTP => {

  switch (action.type) {
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
    case 'SET_USERS':
      return {
        ...state, users: action.users
      }
    case 'SET_CURRENT_PAGE':
      return {...state, currentPage: action.currentPage}
    case 'SET_TOTAL_USER_COUNT':
      return {
        ...state,
        totalUserCount: action.totalCount
      }
    case 'TOGGLE_IS_FETCHING':
      return{
        ...state,
        isFetching: action.isFetching
      }
    case 'FOLLOWING_IN_PROGRESS':
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.id]
          : [...state.followingInProgress.filter(id => id !== action.id)]
      }
    default:
      return state;
  }
}

type ThunkType = ThunkAction<Promise<void>, AllAppTypes, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState ) => {
    dispatch(setIsFetching(true))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }
}
export const follow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch( toggleFollowingProgress( true, userId))
    usersAPI.post(userId)
      .then( (data: any) => {
        if (data.resultCode === 0) {
          dispatch (followSuccess(userId))
        }
        dispatch (toggleFollowingProgress(false, userId))
      })
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch (toggleFollowingProgress(true, userId))
    usersAPI.delete( userId )
      .then( (data: any) => {
        if (data.resultCode === 0 ) {
          dispatch (unfollowSuccess(userId))
        }
        dispatch (toggleFollowingProgress(false, userId))
      })
  }
}

export default usersReducer