import React from "react"
import {follow, UserType} from "../../redux/userspage-reducer"
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export type UsersPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (currentPage: number) => void
  onPageChanged: (page: number) => void
  followingInProgress: Array<number>
  toggleFollowingProgress: (followingInProgress: boolean, id: number) => void
}

export const Users:React.FC<UsersPropsType> = ({users, currentPage, onPageChanged, totalUsersCount,
                                                 pageSize, ...props}:UsersPropsType ) => {
    return (
        <div>
          <Paginator currentPage = {currentPage}
                     onPageChanged = {onPageChanged}
                     pageSize = {pageSize}
                     totalUserCount = {totalUsersCount}
          />
          <div>
            { users.map( (u: UserType) => <User user = {u}
                                                followingInProgress = {props.followingInProgress}
                                                follow = {props.follow}
                                                unfollow = {props.unfollow}
                                                key={u.id}/>)}
          </div>
        </div>
      )
}