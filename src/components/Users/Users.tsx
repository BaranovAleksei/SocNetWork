import React from "react"
import Paginator from "../common/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../Types/Types";

export type UsersPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (page: number) => void
  followingInProgress: Array<number>
}

export const Users:React.FC<UsersPropsType> = ({users, currentPage, onPageChanged, totalUsersCount,
                                                 pageSize, ...props}:UsersPropsType ) => {
    return (
        <div>
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