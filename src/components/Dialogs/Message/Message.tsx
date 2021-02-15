import React from 'react';
import s from './../Dialogs.module.sass';

export type MessagesType = {
  id: number
  message: string
}

export function Message (props: MessagesType) {
  return (
    <div className={ s.messageOver }>
      <span>{props.message}</span>
    </div>
  )
}