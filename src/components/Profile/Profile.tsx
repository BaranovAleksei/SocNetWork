import React, { ChangeEvent } from 'react';
import s from './Profile.module.sass';

import { Post } from './Post';
import { ActionType } from "../../redux/state";

type profileInfoType = {
  text: string
  img: string
  likes: number | null
};

type PostPropsType = {
  id: number | null
  message: string
  likesCount: number | null
};

type ProfilePropsType = {
  profileInfo: profileInfoType
  posts: Array<PostPropsType>
  messageForNewPost: string
  // dispatch: (action: ActionType) => void
  postOnChange: ( text: string ) => void
  addPost: () => void
}

export const Profile: React.FC<ProfilePropsType> = ( props: ProfilePropsType) => {

  const postOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    props.postOnChange( text );
  }

  const addPost = () => {
    props.addPost();
  }

  const mappedPosts = props.posts.map( (el: PostPropsType) => (
    <Post
      id={el.id}
      message={el.message}
      likesCount={el.likesCount}
    />
  ));


  return (
    <div className = {s.profile}>
      <img className = {s.imgProfile} src = { props.profileInfo.img} alt=""/>
      <div className={s.description}>
        <span>{props.profileInfo.text}</span>
      </div>
      <div className={s.newPost}>
        <input value={ props.messageForNewPost }
                  onChange={ postOnChange }>
        </input>
        <button onClick={ addPost }> add post </button>
      </div>
      <div className={s.OverlayPosts}>
        { mappedPosts }
      </div>
    </div>
  )
}