import { usersAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';
import {AllAppTypes, InferActionsTypes} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helper";
import {UsersPageType, UserType} from "../Types/Types";
import {Dispatch} from "react"
import {APIResponseType} from '../api/api'

const initialState: UsersPageType = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUserCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true,
  followingInProgress: [] as Array<number>
}
export const actions = {
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage}as const),
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId}as const),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId}as const),
  setUsers: ( users: Array<UserType>) => ({ type: 'SET_USERS', users}as const),
  setTotalUsersCount: ( totalCount: number) => ({ type: 'SET_TOTAL_USER_COUNT', totalCount}as const),
  setIsFetching: ( isFetching: boolean)=> ({ type: 'TOGGLE_IS_FETCHING', isFetching}as const),
  toggleFollowingProgress: ( followingInProgress: boolean, id: number) => ({type: 'FOLLOWING_IN_PROGRESS', followingInProgress, id}as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>

const usersReducer = (state = initialState, action: ActionsTypes): UsersPageType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
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

//Thunk
type ThunkType = ThunkAction<Promise<void>, AllAppTypes, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState ) => {
    dispatch(actions.setIsFetching(true))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async ( dispatch: Dispatch<ActionsTypes>,
                                    userId: number,
                                    apiMethod: (userId: number) => Promise<APIResponseType>,
                                    actionCreator: (userId: number) => ActionsTypes ) => {
  dispatch( actions.toggleFollowingProgress( true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === 0) {
    dispatch (actionCreator(userId))
  }
  dispatch (actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.post.bind(usersAPI), actions.followSuccess )
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch, getState) => {
    await  _followUnfollowFlow(dispatch, userId, usersAPI.delete.bind(usersAPI), actions.unfollowSuccess)
  }
}

export default usersReducer