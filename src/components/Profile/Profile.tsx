import React, {ChangeEvent} from 'react';
import s from './Profile.module.sass';

import { Post } from './Post';
import {ActionType, PostPropsType, profileInfoType } from "../../redux/state";
import { addPostAC, changeNewTextAC } from "../../redux/profilepage-reducer";


export type PropsType = {
  profileInfo: profileInfoType
  posts: Array<PostPropsType>
  messageForNewPost: string
  dispatch: (action: ActionType) => void
}

export const Profile: React.FC<PropsType> = (props) => {

  const mappedPosts = props.posts.map((el: PostPropsType) => (

    <Post
      id={el.id}
      message={el.message}
      likesCount={el.likesCount}
    />
  ));

  const postOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    props.dispatch(changeNewTextAC(text));
  }

  const addPost = () => {
    props.dispatch(addPostAC(props.messageForNewPost));
  }

  return (
    <div className={s.profile}>
      <img className={s.imgProfile} src={props.profileInfo.img} alt=""/>
      <div className={s.description}>
        <span>{props.profileInfo.text}</span>
      </div>
      <div className={s.newPost}>
        <textarea value={props.messageForNewPost}
                  onChange={postOnChange}>
        </textarea>
        <button onClick={addPost}> add post </button>
      </div>
      <div className={s.OverlayPosts}>
        {mappedPosts}
      </div>
    </div>
  )
}