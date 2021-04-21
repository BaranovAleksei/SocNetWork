import React from 'react'
import { Profile } from "./Profile"
import {
  addPost, setIsFetching, updateStatus,
  PostPropsType, profileInfoType, getUserProfile,
  getStatus, savePhoto
} from "../../redux/profilepage-reducer"
import { connect } from "react-redux"
import { AllAppTypes } from "../../redux/redux-store"
import { Preloader } from "../common/Preloader/Preloader"
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"

type mapStateToPropsType = {
  profileInfo: profileInfoType | null
  posts: Array<PostPropsType>
  isFetching: boolean
  status: string
  isAuth: boolean
  authorizedUserId: number | null
}
type mapDispatchToPropsType = {
  addPost: (postText: string) => void
  setIsFetching: (isFetching: boolean) => void
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
}

type ProfileContainerPT = mapStateToPropsType & mapDispatchToPropsType

type PathParamsType = {
  userId: any
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPT

class ProfileContainer extends React.Component<PropsType> {

  refreshPrifile () {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile (userId)
    this.props.getStatus( userId )
  }

  componentDidMount() {
    this.refreshPrifile()
  }

  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshPrifile()
    }
  }

  addPost = ( newPostText: string) => {
    this.props.addPost( newPostText );
  }

  render () {
    return <>
      {this.props.isFetching ? <Preloader/> : null }
      <Profile
        isFetching = {this.props.isFetching}
        profileInfo = { this.props.profileInfo}
        posts = { this.props.posts }
        addPost={ this.addPost }
        status = { this.props.status }
        updateStatus = { this.props.updateStatus }
        isOwner = {!this.props.match.params.userId}
        savePhoto = {this.props.savePhoto}
      />
    </>
  }
}

const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    profileInfo: state.ProfilePage.profileInfo,
    posts :  state.ProfilePage.posts,
    isFetching: state.ProfilePage.isFetching,
    status: state.ProfilePage.status,
    authorizedUserId: state.Auth.userId,
    isAuth: state.Auth.isAuth
  }
}

export default compose<React.ComponentType> (
  connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps,
    { addPost, getUserProfile, getStatus, updateStatus, setIsFetching, savePhoto}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)