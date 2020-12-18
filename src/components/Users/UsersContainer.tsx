import React from 'react';
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import { Users } from "./Users";
import {followtAC, setUsersAC, unfollowAC,
        setCurrentPageAC,setTotalUsersCountAC, UserType} from "../../redux/userspage-reducer";

type mapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
}

type mapDispatchToPropsType = {
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: any) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalCount: number) => void
}

type UsersContainerPT = mapDispatchToPropsType & mapStateToPropsType

const mapStateToProps = (state: AllAppTypes ):mapStateToPropsType => {
  return {
    users: state.UsersPage.users,
    pageSize: state.UsersPage.pageSize,
    totalUserCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage
  }
}

const mapDispatchToProps = ( dispatch: any ): mapDispatchToPropsType => {
  return {
    follow: (userId: string) => {
      dispatch(followtAC( userId ))
    },
    unfollow: (userId: string) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (currentPage: number) => {
      dispatch(setCurrentPageAC(currentPage))
    },
    setTotalUsersCount: (totalCount: number) => {
      dispatch(setTotalUsersCountAC(totalCount))
    }
  }
}

const UsersContainer: React.FC<UsersContainerPT>= ({ users ,
                                                     follow, unfollow,
                                                     setUsers, pageSize,
                                                     totalUserCount,
                                                     setCurrentPage,
                                                     setTotalUsersCount,
                                                     currentPage}) => {
  return (
    <Users users = {users}
           follow = {follow}
           unfollow = {unfollow}
           setUsers = {setUsers}
           pageSize = {pageSize}
           totalUserCount = {totalUserCount}
           setCurrentPage = {setCurrentPage}
           setTotalUsersCount = {setTotalUsersCount}
           currentPage = {currentPage}
    />
  )
}

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps)(UsersContainer);