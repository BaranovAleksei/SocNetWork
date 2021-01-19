import React, {ChangeEvent} from 'react';
import { Profile } from "./Profile";
import {
  addPost, postOnChange, setIsFetching,
  PostPropsType, profileInfoType, getUserProfile
} from "../../redux/profilepage-reducer";
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import {Preloader} from "../common/Preloader/Preloader";
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
// import {usersAPI} from "../../api/api";

type mapStateToPropsType = {
  profileInfo: profileInfoType | null
  posts: Array<PostPropsType>
  messageForNewPost: string
  isFetching: boolean
  // isAuth: boolean
}
type mapDispatchToPropsType = {
  postOnChange: ( text: string ) => void
  addPost: (postText: string) => void
  // setUserProfile: (profileInfo: any ) => void
  setIsFetching: (isFetching: boolean) => void
  getUserProfile: (userId: number) => void
}

type ProfileContainerPT = mapStateToPropsType & mapDispatchToPropsType

type PathParamsType = {
  userId: any
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPT

class ProfileContainer extends React.Component<PropsType> {

  componentDidMount() {

    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile (userId)
  }

  postOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    this.props.postOnChange( text );
  }
  addPost = ( postText: string) => {
    this.props.addPost( postText );
  }

  render () {

    // if (!this.props.isAuth) return < Redirect to='/login/' />

    return <>
      {this.props.isFetching ? <Preloader/> : null }
      <Profile
        isFetching = {this.props.isFetching}
        profileInfo = { this.props.profileInfo}
        posts = { this.props.posts }
        messageForNewPost={ this.props.messageForNewPost }
        postOnChange={ this.postOnChange }
        addPost={ this.addPost }
      />
    </>
  }
}

const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    profileInfo: state.ProfilePage.profileInfo,
    posts :  state.ProfilePage.posts,
    messageForNewPost: state.ProfilePage.messageForNewPost,
    isFetching: state.ProfilePage.isFetching,
    // isAuth: state.Auth.isAuth
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const WithRouterProfileContainer = withRouter(AuthRedirectComponent)

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps,
  { addPost, postOnChange, getUserProfile, setIsFetching })(WithRouterProfileContainer);