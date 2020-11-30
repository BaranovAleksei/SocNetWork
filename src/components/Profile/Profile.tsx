import React, { ChangeEvent } from 'react';
import { Post } from './Post';
import s from './Profile.module.sass';

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
  postOnChange: ( text: string ) => void
  addPost: (postText: string) => void
}

export const Profile: React.FC<ProfilePropsType> = ( props: ProfilePropsType) => {

  const postOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    props.postOnChange( text );
  }

  const addPost = ( postText: string) => {
    props.addPost( postText );
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
        <button onClick={ () => { addPost(props.messageForNewPost) }}> add post </button>
      </div>
      <div className={s.OverlayPosts}>
        { mappedPosts }
      </div>
    </div>
  )
}