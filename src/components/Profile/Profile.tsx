import React, { ChangeEvent } from 'react';
import s from './Profile.module.sass';

import { Post } from './Post';
import { ProfilePageType, PostPropsType } from "../../redux/state";

export const Profile: React.FC<ProfilePageType> = (props) => {

  const mappedPosts = props.posts.map((el: PostPropsType) => (
    <Post
      id = { el.id }
      message= { el.message}
      likesCount={ el.likesCount }
    />
  ));

  const addPost  = () => {
    props.addPost( props.messageForNewPost);
  }

  const postOnChange = ( e: ChangeEvent<HTMLTextAreaElement>) => {
    props.chengeNewText(e.currentTarget.value);
  }

  return (
    <div className={s.profile}>
      <img className={s.imgProfile} src={props.profileInfa.img} alt=""/>
      <div className={s.description}>
        <span>{ props.profileInfa.text }</span>
      </div>
      <div className={s.newPost}>
        <textarea value={ props.messageForNewPost}
                  onChange = { postOnChange }>
        </textarea>
        <button onClick = { addPost } > add post </button>
      </div>
      <div className={s.OverlayPosts}>
        { mappedPosts }
      </div>
    </div>
  )
}