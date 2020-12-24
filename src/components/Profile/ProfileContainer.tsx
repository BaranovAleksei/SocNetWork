import React, {ChangeEvent} from 'react';
import { Profile } from "./Profile";
import { addPost, postOnChange, setUserProfile, setIsFetching,
         PostPropsType, profileInfoType} from "../../redux/profilepage-reducer";
import { connect } from "react-redux";
import { AllAppTypes } from "../../redux/redux-store";
import axios from "axios";
import {Preloader} from "../common/Preloader/Preloader";
import { withRouter, RouteComponentProps } from 'react-router-dom';

type mapStateToPropsType = {
  profileInfo: profileInfoType | null
  posts: Array<PostPropsType>
  messageForNewPost: string
  isFetching: boolean
}
type mapDispatchToPropsType = {
  postOnChange: ( text: string ) => void
  addPost: (postText: string) => void
  setUserProfile: (profileInfo: any ) => void
  setIsFetching: (isFetching: boolean) => void
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
    debugger
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then( (response: any) => {
        this.props.setIsFetching(false);
        this.props.setUserProfile(response.data);
      });
  }

  postOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    this.props.postOnChange( text );
  }
  addPost = ( postText: string) => {
    this.props.addPost( postText );
  }

  render () {
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
    isFetching: state.ProfilePage.isFetching
  }
}

const WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps,
  { addPost, postOnChange, setUserProfile, setIsFetching })(WithRouterProfileContainer);