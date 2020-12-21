import React from 'react';
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import {
  follow, setUsers, unfollow,
  setCurrentPage, setTotalUsersCount, UserType, setIsFetching
} from "../../redux/userspage-reducer";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type mapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
}

type mapDispatchToPropsType = {
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: any) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalCount: number) => void
  setIsFetching: (isFetching: boolean) => void
}

type UsersContainerPT = mapDispatchToPropsType & mapStateToPropsType

class UsersContainer extends React.Component<UsersContainerPT> {

  componentDidMount() {
    this.props.setIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}
    &count=${this.props.pageSize}`)
      .then( (response: any) => {
        this.props.setIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      })
  }
  onPageChanged  = ( pageNumber: number ) => {
    this.props.setIsFetching(true)
    this.props.setCurrentPage( pageNumber )
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }
    &count=${this.props.pageSize}`)
      .then( (response: any) => {
        this.props.setIsFetching(false)
        this.props.setUsers(response.data.items);
      })
  }

  render() {
    return <>
           {this.props.isFetching ? <Preloader/> : null }
           <Users users={this.props.users}
                  totalUsersCount = {this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged = {this.onPageChanged}
                  setCurrentPage={this.props.setCurrentPage}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
      />
    </>
  }
}

const mapStateToProps = (state: AllAppTypes ):mapStateToPropsType => {
  return {
    users: state.UsersPage.users,
    pageSize: state.UsersPage.pageSize,
    totalUsersCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching
  }
}

// const mapDispatchToProps = ( dispatch: any ): mapDispatchToPropsType => {
//   return {
//     follow: (userId: string) => {
//       dispatch(followtAC( userId ))
//     },
//     unfollow: (userId: string) => {
//       dispatch(unfollowAC(userId))
//     },
//     setUsers: (users: Array<UserType>) => {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (currentPage: number) => {
//       dispatch(setCurrentPageAC(currentPage))
//     },
//     setTotalUsersCount: (totalCount: number) => {
//       dispatch(setTotalUsersCountAC(totalCount))
//     },
//     setIsFetching: (isFetching: boolean   ) => {
//       dispatch(setIsFetchingAC(isFetching))
//     }
//   }
// }

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>
              (mapStateToProps,
                {follow, unfollow, setCurrentPage, setTotalUsersCount,
              setIsFetching, setUsers} )
              (UsersContainer);