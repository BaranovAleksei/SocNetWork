import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.sass';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from "./Message/Message";
import { Redirect } from 'react-router-dom';
import {reduxForm, Field } from "redux-form";

type DialogsType = {
  id: number
  name: string
}
type MessagesType = {
  id: number
  message: string
};

type DialogsPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  // messageForNewMessage: string
  // changeMessage: ( text: string) => void
  addMessage: (string: string ) => void
}

export const Dialogs: React.FC< DialogsPropsType > = (props) => {

  // const changeMessage = ( e: ChangeEvent<HTMLInputElement> ) => {
  //   const text = e.currentTarget.value;
  //   props.changeMessage( text );
  // };
  // const addMessage = (newMessage: string) => {
  //   props.addMessage(newMessage);
  // }

  let addNewMessage = (values: any) => {
    props.addMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { props.dialogs.map( (dial: DialogsType ) => ( <DialogItem name = { dial.name } id = { dial.id }/> ))}
      </div>
      <div className={s.messagesOver}>
        { props.messages.map( (mes: MessagesType ) => ( <Message id = {mes.id}  message={ mes.message}/> ))}
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

const AddMessageForm = (props:any) => {
  return  <>
    <form onSubmit={ props.handleSubmit }>
      <Field component='textarea' name = 'newMessageBody' placeholder='Enter your message'/>
      <button>add Message</button>
    </form>
  </>
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)