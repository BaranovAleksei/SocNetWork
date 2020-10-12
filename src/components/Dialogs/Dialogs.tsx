import React, {ChangeEvent, useState} from 'react';
import s from './Dialogs.module.sass';
import { DialogPageType, DialogsType, MessagesType } from './../../redux/state';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from "./Message/Message";

export const Dialogs: React.FC<DialogPageType> = (props) => {

  const [message, setMessage] = useState('');

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const addMessage = () => {
    console.log('push button addMessage');
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { props.dialogs.map( (dial: DialogsType ) => ( <DialogItem name = { dial.name } id = { dial.id }/> ))}
      </div>
      <div className={s.messagesOver}>
        { props.messages.map( (mes: MessagesType ) => ( <Message id = {mes.id}  message={ mes.message}/> ))}
        <input
          value = { message }
          onChange= { onChangeMessage }
        />
        <button onClick = { addMessage } > reply </button>
      </div>
    </div>
  )
}