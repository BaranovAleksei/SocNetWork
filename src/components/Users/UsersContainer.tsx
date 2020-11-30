import React from 'react';
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import { Users } from "./Users";
import {followtAC, setUsersAC, unfollowAC, UserType} from "../../redux/userspage-reducer";

type mapStateToPropsType = {
  users: any
}
type mapDispatchToPropsType = {
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: any) => void
}

type UsersContainerPT = mapDispatchToPropsType & mapStateToPropsType

const mapStateToProps = (state: AllAppTypes ):mapStateToPropsType => {
  return {
    users: state.UsersPage.users
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
    }
  }
}

const UsersContainer: React.FC<UsersContainerPT>= ({users , follow, unfollow, setUsers}) => {
  return (
    <Users users={users}
           follow={follow}
           unfollow={unfollow}
           setUsers={setUsers}/>
  )
}

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps)(UsersContainer);