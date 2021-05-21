import React from "react"
import Paginator from "../common/Paginator/Paginator"
import {User} from "./User";
import {UserType} from "../../Types/Types"
import {UsersSearchForm} from "./UsersSearchForm"
import {FilterType} from "../../redux/users-reducer"

export type PropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (page: number) => void
  followingInProgress: Array<number>
  onFilterChanged: (filter: FilterType) => void
 }

export const Users:React.FC<PropsType> = ({ users,
                                            currentPage,
                                            onPageChanged,
                                            totalUsersCount,
                                            pageSize,
                                            onFilterChanged,
                                            ...props} ) => {
    return (
        <div>
          <UsersSearchForm onFilterChanged={onFilterChanged}/>
          <div>
            { users.map( (u: UserType) => <User user = {u}
                                                followingInProgress = {props.followingInProgress}
                                                follow = {props.follow}
                                                unfollow = {props.unfollow}
                                                key={u.id}/>)}
          </div>
          <Paginator currentPage = {currentPage}
                     onPageChanged = {onPageChanged}
                     pageSize = {pageSize}
                     totalItemsCount = {totalUsersCount}
          />
        </div>
      )
}