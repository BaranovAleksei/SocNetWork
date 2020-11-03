import React, {ChangeEvent} from 'react';
import s from './Profile.module.sass';

import {Post} from './Post';
import {PostPropsType, profileInfoType, ActionType, changeNewTextAC, addPostAC} from "../../redux/state";
import {type} from "os";

export type PropsType = {
  profileInfo: profileInfoType
  posts: Array<PostPropsType>
  messageForNewPost: string
  // addPost: () => void
  // changeNewText: (text: string) => void
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
    props.dispatch(changeNewTextAC(e.currentTarget.value))
  }

  const addPost = () => {
    props.dispatch(addPostAC(props.messageForNewPost));
    props.dispatch(changeNewTextAC(''));
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