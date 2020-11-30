import React from 'react';
import { Profile } from "./Profile";
import { addPostAC, changeNewTextAC } from "../../redux/profilepage-reducer";
import {connect} from "react-redux";
import {AllAppTypes} from "../../redux/redux-store";


type profileInfoType = {
  text: string
  img: string
  likes: number | null
}
type PostPropsType = {
  id: number | null
  message: string
  likesCount: number | null
}
type mapStateToPropsType = {
  profileInfo: profileInfoType
  posts: Array<PostPropsType>
  messageForNewPost: string
}
type mapDispatchToPropsType = {
  postOnChange: ( text: string ) => void
  addPost: (postText: string) => void
}

type ProfileContainerPT = mapStateToPropsType & mapDispatchToPropsType

const ProfileContainer: React.FC<ProfileContainerPT> = ( {  profileInfo,
                                                            posts,
                                                            messageForNewPost,
                                                            postOnChange,
                                                            addPost }) => {
  return (
    <Profile profileInfo={ profileInfo }
             posts={ posts }
             messageForNewPost={ messageForNewPost }
             postOnChange={ postOnChange }
             addPost={ addPost } />
  )
}
const mapStateToProps = ( state: AllAppTypes ): mapStateToPropsType => {
  return {
    profileInfo: state.ProfilePage.profileInfo,
    posts :  state.ProfilePage.posts,
    messageForNewPost: state.ProfilePage.messageForNewPost
  }
}

const mapDispatchToProps = ( dispatch: any ): mapDispatchToPropsType => {
  return {
    postOnChange:  ( text: string ) => {
      const action = changeNewTextAC( text );
      dispatch( action );
    },
    addPost: (postText: string) => {
      let action = addPostAC(postText)
      dispatch(action);
    }
  }
}

export default connect< mapStateToPropsType, mapDispatchToPropsType, {}, AllAppTypes>(mapStateToProps, mapDispatchToProps)(ProfileContainer);