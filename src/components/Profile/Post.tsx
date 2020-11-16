import React from 'react';
import s from './Profile.module.sass'

type PostPropsType = {
  id: number | null
  message: string
  likesCount: number | null
};

export function Post ( props: PostPropsType ) {
  return (
    <div className={ s.PostOverlay }>
      <p>{ props.message }</p>
      <p>{ props.likesCount }</p>
    </div>
  )
}