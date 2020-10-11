import React, {ChangeEvent, useState} from 'react';
import s from './Profile.module.sass';
import { v1 } from "uuid";

import { Post } from './Post';
import {ProfilePageType, PostsType} from "../../redux/state";

export const Profile: React.FC<ProfilePageType> = (props) => {

  const [ post , setPost] = useState<string>('')

  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(e.currentTarget.value);
  };

  const addPost = ( ) => {
    console.log(' addPost');
  }

  const mappedPosts = props.posts.map((el: PostsType) => (
    <Post
      message={el.message}
      likesCount={el.likesCount}
    />
  ));

  return (
    <div className={s.profile}>
      <img className={s.imgProfile} src={props.profileInfa.img} alt=""/>
      <div className={s.description}>
        <span>{ props.profileInfa.text }</span>
      </div>
      <div className={s.newPost}>
        <input
          value = { post }
          onChange= { onChangePost }
        />
        <button onClick = { addPost } > add post </button>
      </div>
      <div className={s.OverlayPosts}>
        { mappedPosts }
      </div>
    </div>
  )
}