import React from 'react';
import s from './Profile.module.sass'
import { PostPropsType } from "../../redux/profilepage-reducer";

export function Post ( props: PostPropsType ) {
  return (
    <div className={ s.PostOverlay }>
      <p>{ props.message }</p>
      <p>{ props.likesCount }</p>
    </div>
  )
}