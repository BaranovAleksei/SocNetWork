import {AllAppTypes} from "./redux-store";

export const getUsers = (state: AllAppTypes)  => {
    return state.UsersPage.users
}
export const getPageSize = (state: AllAppTypes)  => {
    return state.UsersPage.pageSize
}
export const getTotalUsersCount = (state: AllAppTypes)  => {
    return state.UsersPage.totalUserCount
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