import React from 'react';
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import {follow, unfollow, requestUsers, FilterType} from "../../redux/users-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
  getCurrentPage, getFollowingInProgress, getIsFetching,
  getPageSize,
  getTotalUsersCount, getUsersFilter,
  getUserSuper
} from "../../redux/users-selectors";
import {UserType} from "../../Types/Types";

type mapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  filter: FilterType
}

type mapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsers: ( currentPage: number, pageSize: number, filter: FilterType ) => void
}

type UsersContainerPT = mapDispatchToPropsType & mapStateToPropsType

class UsersContainer extends React.Component<UsersContainerPT> {

  componentDidMount() {
    const { currentPage , pageSize, filter} = this.props
    this.props.getUsers(currentPage, pageSize, filter )
  }

  onPageChanged  = ( pageNumber: number ) => {
    const {pageSize, filter} = this.props
    this.props.getUsers(pageNumber, pageSize, filter)
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.getUsers(1, pageSize, filter)
  }

  render() {
    return <>
           {this.props.isFetching ? <Preloader/> : null }
           <Users users={this.props.users}
                  totalUsersCount = {this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged = {this.onPageChanged}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  followingInProgress = {this.props.followingInProgress }
                  onFilterChanged={this.onFilterChanged}
        />
    </>
  }
}

const mapStateToProps = (state: AllAppTypes ):mapStateToPropsType => {
  return {
    users: getUserSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  }
}

export default compose<React.ComponentType> (
  connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>
  ( mapStateToProps,
    { follow, unfollow, getUsers: requestUsers } ),
  // withAuthRedirect
)(UsersContainer)