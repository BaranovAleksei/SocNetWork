import React from 'react';
import { MessagesType } from './../../../redux/state';
import s from './../Dialogs.module.sass';

export function Message (props: MessagesType) {
  return (
    <div className={ s.messageOver }>
      <span>{props.message}</span>
    </div>
  )
}