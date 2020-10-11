import React from 'react';
import s from './Profile.module.sass'

type PropsType = {
  message: string
  likesCount: number | null
}

export function Post (props: PropsType) {
  return (
    <div className={s.PostOverlay}>
      <p>{props.message}</p>
      <span>{props.likesCount}</span>
    </div>
  )
}