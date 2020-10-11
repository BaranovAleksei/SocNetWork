import React from 'react';
import s from './Dialogs.module.sass';
import { DialogPageType } from './../../redux/state';
import { DialogItem } from './DialogItem/DialogItem';

type DialogsType = {
  id: number
  name: string
}
type MessagesType = {
  message: string
}

export const Dialogs: React.FC<DialogPageType> = (props) => {

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { props.dialogs.map( (el:DialogsType ) => ( <DialogItem name = { el.name } id = { el.id }  /> ))}
      </div>
    </div>
  )
}