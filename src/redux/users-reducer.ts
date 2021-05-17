import { usersAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';
import { AllAppTypes } from "./redux-store";
import {updateObjectInArray} from "../utils/object-helper";
import {UsersPageType, UserType} from "../Types/Types";
import {Dispatch} from "react"
import {APIResponseType} from '../api/api'

  const SET_CURRENT_PAGE = 'USERS_REDUCER/SET_CURRENT_PAGE'
  const FOLLOW = 'USERS_REDUCER/FOLLOW'
  const UNFOLLOW = 'USERS_REDUCER/UNFOLLOW'
  const SET_USERS = 'USERS_REDUCER/SET_USERS'
  const SET_TOTAL_USER_COUNT = 'USERS_REDUCER/SET_TOTAL_USER_COUNT'
  const TOGGLE_IS_FETCHING = 'USERS_REDUCER/TOGGLE_IS_FETCHING'
  const FOLLOWING_IN_PROGRESS = 'USERS_REDUCER/FOLLOWING_IN_PROGRESS'

const initialState: UsersPageType = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUserCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true,
  followingInProgress: [] as Array<number>
}

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}

type followType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): followType => {
  return {
    type: FOLLOW,
    userId
  }
}

type unfollowType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number): unfollowType => {
  return {
    type: UNFOLLOW,
    userId
  }
}

type setUsersType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = ( users: Array<UserType>): setUsersType => {
  return {
    type: SET_USERS,
    users
  }
}

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USER_COUNT,
  totalCount: number
}
export const setTotalUsersCount = ( totalCount: number): setTotalUsersCountType => {
  return {
    type: SET_TOTAL_USER_COUNT,
    totalCount
  }
}

type setIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const setIsFetching = ( isFetching: boolean): setIsFetchingType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  }
}

type toggleFollowingProgressType = {
  type: typeof FOLLOWING_IN_PROGRESS
  followingInProgress: boolean
  id: number
}
export const toggleFollowingProgress = ( followingInProgress: boolean, id: number): toggleFollowingProgressType => {
  return {
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress, id
  }
}

type ActionType = followType | unfollowType | setCurrentPageType |setTotalUsersCountType
                | setUsersType | setIsFetchingType | toggleFollowingProgressType

const usersReducer = (state = initialState, action: ActionType): UsersPageType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }
    case SET_USERS:
      return {
        ...state, users: action.users
      }
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage}
    case SET_TOTAL_USER_COUNT:
      return {
        ...state,
        totalUserCount: action.totalCount
      }
    case TOGGLE_IS_FETCHING:
      return{
        ...state,
        isFetching: action.isFetching
      }
    case FOLLOWING_IN_PROGRESS:
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

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState ) => {
    dispatch(setIsFetching(true))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionType>,
                                  userId: number,
                                  apiMethod: (userId: number) => Promise<APIResponseType>,
                                  actionCreator: (userId: number) => ActionType ) => {
  dispatch( toggleFollowingProgress( true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === 0) {
    dispatch (actionCreator(userId))
  }
  dispatch (toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.post.bind(usersAPI), followSuccess )
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    await  _followUnfollowFlow(dispatch, userId, usersAPI.delete.bind(usersAPI), unfollowSuccess)
  }
}

export default usersReducer