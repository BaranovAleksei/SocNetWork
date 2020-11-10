import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.sass';
import {ActionType, DialogsType, MessagesType } from './../../redux/state';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from "./Message/Message";
import {changeMessageBodyAC, sendMessageAC} from "../../redux/dialogspage-reducer";

type PropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  messageForNewMessage: string
  dispatch: (action: ActionType) => void
}

export const Dialogs: React.FC<PropsType> = (props) => {

  // вариант через локал стайт, вроде не очень
  // const [message, setMessage] = useState('');
  // const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMessage(e.currentTarget.value);
  // };
  // const addMessage = () => {
  //   console.log('push button addMessage');
  //   setMessage('')
  // };

  // второй вариант чеерз state
  const changeMessage = (e:ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    props.dispatch(changeMessageBodyAC(text));
  }
  const addMessage = () => {
    props.dispatch(sendMessageAC(props.messageForNewMessage));
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { props.dialogs.map( (dial: DialogsType ) => ( <DialogItem name = { dial.name } id = { dial.id }/> ))}
      </div>
      <div className={s.messagesOver}>
        { props.messages.map( (mes: MessagesType ) => ( <Message id = {mes.id}  message={ mes.message}/> ))}
        <input
          value = { props.messageForNewMessage }
          onChange ={ changeMessage }
        />
        <button onClick = { addMessage } > reply </button>
      </div>
    </div>
  )
}