import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.sass';
import { DialogsType, MessagesType } from './../../redux/state';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from "./Message/Message";

type DialogsPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  messageForNewMessage: string
  changeMessage: ( text: string) => void
  addMessage: (string: string ) => void
}

export const Dialogs: React.FC< DialogsPropsType > = (props) => {

  const changeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
    const text = e.currentTarget.value;
    props.changeMessage( text );
  };
  const addMessage = (newMessage: string) => {
    props.addMessage(newMessage);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { props.dialogs.map( (dial: DialogsType ) => ( <DialogItem name = { dial.name } id = { dial.id }/> ))}
      </div>
      <div className={s.messagesOver}>
        { props.messages.map( (mes: MessagesType ) => ( <Message id = {mes.id}  message={ mes.message}/> ))}
        <input
          value = { props.messageForNewMessage }
          onChange={ changeMessage }
        />
        <button onClick = { () => {addMessage(props.messageForNewMessage)} } > add Message </button>
      </div>
    </div>
  )
}