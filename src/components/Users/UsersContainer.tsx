import React from 'react';
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import { follow, unfollow, setUsers,
  setCurrentPage, setTotalUsersCount, UserType, setIsFetching, toggleFollowingProgress, getUsers
} from "../../redux/userspage-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";

type mapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}

type mapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: any) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalCount: number) => void
  setIsFetching: (isFetching: boolean) => void
  toggleFollowingProgress: (followingInToggle: boolean, id: number) => void
  getUsers: ( currentPage: number, pageSize: number ) => void
}

type UsersContainerPT = mapDispatchToPropsType & mapStateToPropsType

class UsersContainer extends React.Component<UsersContainerPT> {

  componentDidMount() {

    this.props.getUsers(this.props.currentPage, this.props.pageSize)

    // before thunkCrete
    // this.props.setIsFetching(true)
    //
    // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
    //   .then( (data: any) => {
    //     this.props.setIsFetching(false);
    //     this.props.setUsers( data.items );
    //     this.props.setTotalUsersCount( data.totalCount);
    //   })
  }

  onPageChanged  = ( pageNumber: number ) => {

    this.props.setCurrentPage( pageNumber )
    this.props.getUsers(pageNumber, this.props.pageSize)

    // before thunkCreate
    // this.props.setIsFetching(true)
    // this.props.setCurrentPage( pageNumber )
    //
    // usersAPI.getUsers(pageNumber, this.props.pageSize)
    //   .then( (data: any ) => {
    //     this.props.setIsFetching(false )
    //     this.props.setUsers( data.items );
    //   })
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
                  toggleFollowingProgress = {this.props.toggleFollowingProgress}
                  followingInProgress = {this.props.followingInProgress }
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
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress
  }
}

// const mapDispatchToProps = ( dispatch: any ): mapDispatchToPropsType => {
//   return {
//     follow: (userId: string) => {
//       dispatch(followAC( userId ))
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
              ( mapStateToProps,
                { follow, unfollow, setCurrentPage,
                  setTotalUsersCount, setIsFetching, setUsers,
                  toggleFollowingProgress, getUsers } )
              (UsersContainer);