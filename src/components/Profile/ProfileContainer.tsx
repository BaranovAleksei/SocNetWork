import React from 'react';
import { Profile } from "./Profile";
import { addPostAC, changeNewTextAC } from "../../redux/profilepage-reducer";
import { StoreType } from "../../redux/state";


export type ProfileContainerPropsType = {
  store: StoreType
}

export const ProfileContainer: React.FC<ProfileContainerPropsType> = (props: ProfileContainerPropsType) => {

  const state = props.store.getState()

  const postOnChange = ( text: string ) => {
   const action = changeNewTextAC( text );
   props.store.dispatch( action );
  }

  const addPost = () => {
    props.store.dispatch( addPostAC( state.ProfilePage.messageForNewPost) );
  }

  return <Profile profileInfo = { state.ProfilePage.profileInfo}
                  posts = { state.ProfilePage.posts}
                  messageForNewPost = { state.ProfilePage.messageForNewPost }
                  postOnChange = { postOnChange }
                  addPost = { addPost }
  />
}