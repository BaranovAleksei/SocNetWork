import React from 'react';
import s from './../Dialogs.module.sass';

type DialogItemType = {
  name: string
  id: number
}

export function DialogItem (props: DialogItemType) {
  return (
    <div className={s.nameDialog}>
      <span> {props.name} </span>
    </div>
  )
}