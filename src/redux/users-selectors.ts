import {AllAppTypes} from "./redux-store"
import {createSelector} from 'reselect'

export const getUsers = (state: AllAppTypes)  => {
    return state.UsersPage.users
}

export const getUserSuper = createSelector( getUsers, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AllAppTypes)  => {
    return state.UsersPage.pageSize
}

export const getTotalUsersCount = (state: AllAppTypes)  => {
    return state.UsersPage.totalUsersCount
}

export const getCurrentPage = (state: AllAppTypes)  => {
    return state.UsersPage.currentPage
}

export const getIsFetching = (state: AllAppTypes)  => {
    return state.UsersPage.isFetching
}

export const getFollowingInProgress = (state: AllAppTypes)  => {
    return state.UsersPage.followingInProgress
}

export const getUsersFilter = (state: AllAppTypes) => {
  return state.UsersPage.filter
}